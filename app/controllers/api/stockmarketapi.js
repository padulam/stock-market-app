var Stocks = require('../../models/stocks');
var httpRequest = require('request');
var strictUriEncode = require('strict-uri-encode');
var jsonStringifyPlus = require('json-stringify-plus');

function StockMarketApi(){
  var self = this;

  this.addStock = function(request, response){
    var symbol = request.body.symbol;
    var apiUrl = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + symbol;

    httpRequest(apiUrl, function(httpErr, httpResponse, data){
      if(httpErr) response.json({error: httpErr});

      var stockData = JSON.parse(data); 

      if(stockData.Status==="SUCCESS"){
        var stock = new Stocks();

        stock.symbol = stockData.Symbol;
        stock.name = stockData.Name;

        stock.save(function(err){
          if(err) response.json({error: err});

          response.json(stock);
        });
      } else{
        response.json(stockData.Message);
      }
    });
  }

  this.removeStock = function(request, response){
    Stocks.remove({
      _id: request.params.stock_id
    }, function(err, stock){
      if(err) response.json({error: err});

      self.getStockData(request, response);
    });
  }

  //Get names of saved stocks
  this.getStockData = function(request, response){
    Stocks.find(function(err, stocks){
      if(err) response.json({error: err});

      response.json(stocks);
    });
  }

  //Get stock chart data for individual stock
  this.getStockChartData = function(request, response){
    var symbols = request.query.symbol;
    var elementsData = [];
    for(var i=0;i<symbols.length;i++){
      elementsData.push({
          Symbol: symbols[i], 
          Type: "price", 
          Params: ["c"]
      });
    }

    var parameters = {
        Normalized: false,
        NumberOfDays: 365,
        DataPeriod: "Day",
        Elements: elementsData
    };

    parameters = jsonStringifyPlus(parameters);

    var apiUrl = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=" + strictUriEncode(parameters);

    httpRequest(apiUrl, function(httpErr, httpResponse, data){
      if(httpErr) response.json({error: httpErr});

      var stockData = JSON.parse(data);

      if(typeof stockData === "object"){
        var stocks = [];

        for(var i = 0;i<stockData.Elements.length;i++){
          var datePrice = [];
          var stockValues = stockData.Elements[i].DataSeries.close.values;

          for(var j = 0;j<stockValues.length;j++){
            datePrice.push([new Date(stockData.Dates[j]).getTime(), stockValues[j]]);
          }

          var chartData = {
            symbol: stockData.Elements[i].Symbol,
            datePrice: datePrice
          };

          stocks.push(chartData);
        }

        response.json(stocks);
      } else{
        response.json({error: "Invalid stock symbol!"});
      }
    });
  }
}

module.exports = StockMarketApi;