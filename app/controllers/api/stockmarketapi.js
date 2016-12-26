var Stocks = require('../../models/stocks');

function StockMarketApi(){
  this.addStock = function(request, response){
    //ToDo: Add stock symbol validation
    var stock = new Stocks();

    stock.symbol = request.body.symbol;

    stock.save(function(err){
      if(err) response.json({error: err});

      response.json({success: 'Stock added!'});
    });
  }

  this.removeStock = function(request, response){
    Stocks.remove({
      _id: request.params.stock_id
    }, function(err, stock){
      if(err) {error: err};

      response.json({success: 'Stock remove!'});
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

  }
}

module.exports = StockMarketApi;