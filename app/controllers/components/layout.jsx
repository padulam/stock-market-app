import React from 'react';
import Home from './home.jsx';

export default class Layout extends React.Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#voting-app-navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a to="/" className="navbar-brand"><i className="fa fa-eye" aria-hidden="true"></i> StockVision</a>
            </div>
          </div>
        </nav>
        <Home />
      </div>
    );
  }
}