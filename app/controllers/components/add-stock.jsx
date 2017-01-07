import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';

export default class AddStock extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {symbol: undefined};
    
    this._changeStockSymbol = this._changeStockSymbol.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _changeStockSymbol(){
    this.setState({
      symbol: this._symbol.value
    })
  }

  _handleSubmit(e){
    e.preventDefault();
    this.props.addStock(this.state);
    this._symbol.value = "";
    this.setState({symbol: undefined});
  }

  render(){
    return(
      <div className="card col-lg-3 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1" id="addStock">
        <form method="post" className="form-inline"  onSubmit={this._handleSubmit}>
          <div id="addStockInput" className="form-group">
            <div className="input-group add-stock-input-group">
              <input placeholder="Enter Stock Symbol" onChange={this._changeStockSymbol} ref={v => this._symbol = v} type="text" id="stockSymbol" className="form-control" aria-describedby="addStockHelper"/>
              <span className="input-group-btn">
                <button className="btn btn-primary" type="submit">Add Stock</button>
              </span>
            </div>
            <span className="help-block" id="addStockHelper"></span>
          </div>
        </form>
      </div>
    );
  }
}