import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';

export default class AddStock extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {symbol: undefined};
    
    this._changeStockSymbol = this._changeStockSymbol.bind(this);
    this._addStock = this._addStock.bind(this);
  }

  _changeStockSymbol(){
    this.setState({
      symbol: this._symbol.value
    })
  }

  _addStock(e){
    e.preventDefault();
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/stocks';
    var newStockData = this.state;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      //Update state with new stock information
      console.log(data);
    }, newStockData));
  }

  render(){
    return(
      <div className="card" id="addStock">
        <form method="post" onSubmit={this._addStock}>
          <div className="form-group">
            <label htmlFor="stockSymbol">Enter Stock Symbol:</label>
            <input onChange={this._changeStockSymbol} ref={v => this._symbol = v} type="text" id="stockSymbol" className="form-control"/>
          </div>
          <button className="btn btn-primary" type="submit">Add Stock</button>
        </form>
      </div>
    );
  }
}