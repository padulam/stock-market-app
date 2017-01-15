import React from 'react';
import Home from './home.jsx';

const Layout = () =>{
  return(
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand" id="stockVisionBrand"><i className="fa fa-eye" aria-hidden="true"></i> StockVision</div>
          </div>
        </div>
      </nav>
      <Home />
    </div>
  );
};

export default Layout;