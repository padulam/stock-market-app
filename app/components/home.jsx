import React from 'react';
import AddStock from './add-stock.jsx';
import StockChart from './stock-chart.jsx';
import StockCard from './stock-card.jsx';
import ajaxFunctions from '../common/ajax-functions';
import io from 'socket.io-client';
let socket = io(window.location.origin);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {stocks: []};
  }

  componentDidMount() {
    this._fetchStockData();

    let self = this;
    socket.on('updateStocks', function(data){
      self.setState({stocks: data});
    });
  }

  _fetchStockData(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/stocks';
    let self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({stocks: JSON.parse(data)});
    }));    
  }

  _getStockData(){
    let i = 0;
    return this.state.stocks.map((stock) => {
      i++;
      return <StockCard 
                id = {stock._id}
                symbol = {stock.symbol}
                name = {stock.name}
                removeStock = {this._removeStock.bind(this)}
                key = {stock._id} />
    });
  }

  _addStock(newStock){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/stocks';
    let self = this;

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      let stockData = JSON.parse(data);
      let stockHelper = document.getElementById("addStockHelper");

      if(stockData.symbol){
        document.getElementById("addStockInput").classList.remove("has-error");
        stockHelper.style.visibility = "hidden";
        let newStocks = self.state.stocks.concat([stockData]);
        self.setState({stocks: newStocks});
        socket.emit('updateStocks', newStocks);
      } else{
        document.getElementById("addStockInput").classList.add("has-error");
        stockHelper.style.visibility = "visible";
        stockHelper.innerText = "No symbol matches for " + newStock.symbol;
      }
    }, newStock);
  }

  _removeStock(stockSymbol){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/stocks/' + stockSymbol;
    let self = this;

    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      let stockData = JSON.parse(data);
      socket.emit('updateStocks', stockData);
      self.setState({stocks: stockData});
    });
  }

  render(){
    let stocks = this._getStockData();
    let stockSymbols = [];
    let stockChart;

    if(stocks.length>0){
      for(let i=0;i<stocks.length;i++){
        stockSymbols.push(stocks[i].props.symbol);
      }

      stockChart = <StockChart stockSymbols={stockSymbols}/>;
    }

    return(
      <div className="container">
        {stockChart}
        <div className="cards">
            {stocks}
            <AddStock addStock={this._addStock.bind(this)}/>
        </div>
      </div>
    );
  }
}