module.exports = function(app){
  var path = require('path');
  var dir = process.cwd();
  var bodyParser = require('body-parser');
  var StockMarketApi = require('../controllers/api/stockmarketapi');

  var stockMarketApi = new StockMarketApi();
  var jsonParser = bodyParser.json();


  app.get('/', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.post('/api/stocks', jsonParser, stockMarketApi.addStock);

  app.delete('/api/stocks/:stock_id', stockMarketApi.removeStock);
  
  app.get('/api/stocks', stockMarketApi.getStockData);
};