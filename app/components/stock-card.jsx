import React from 'react';

const StockCard = (props) => {
  const _handleRemoval = () => {
    props.removeStock(props.id);
  }

 return(
    <div className="col-lg-4 col-md-6 col-sm-6">
       <div className="card">
        <p><strong>{props.symbol}</strong><button onClick={_handleRemoval} className="close-sign">x</button></p>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default StockCard;