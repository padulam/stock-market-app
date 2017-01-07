import React from 'react';
import AddStock from './add-stock.jsx';
import ajaxFunctions from '../../common/ajax-functions';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {stocks: []};
  }

  componentDidMount() {
    this._fetchStockData();
  }

  _fetchStockData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/stocks';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({stocks: JSON.parse(data)});
    }));    
  }

  _getStockData(){
    var i = 0;
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
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/stocks';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      var stockData = JSON.parse(data);
      var stockHelper = document.getElementById("addStockHelper");

      if(stockData.symbol){
        document.getElementById("addStockInput").classList.remove("has-error");
        stockHelper.style.visibility = "hidden";
        self.setState({stocks: self.state.stocks.concat([stockData])});
      } else{
        document.getElementById("addStockInput").classList.add("has-error");
        stockHelper.style.visibility = "visible";
        stockHelper.innerText = "No symbol matches for " + newStock.symbol;
      }
    }, newStock));
  }

  _removeStock(stockSymbol){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/stocks/' + stockSymbol;
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      self._fetchStockData();
    }));
  }

  render(){
    let stocks = this._getStockData();
    return(
      <div className="cards container">
        {stocks}
        <AddStock addStock={this._addStock.bind(this)}/>
      </div>
    );
  }
}

class StockCard extends React.Component {
  constructor(props) {
    super(props);

    this._handleRemoval = this._handleRemoval.bind(this)
  }

  _handleRemoval(){
    this.props.removeStock(this.props.id);
  }

  render(){
    return(
      <div className="card col-lg-3 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1">
        <p><strong>{this.props.symbol}</strong><button onClick={this._handleRemoval} className="close-sign">x</button></p>
        <p>{this.props.name}</p>
      </div>
    );
  }
}