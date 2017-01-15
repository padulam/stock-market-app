import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import ajaxFunctions from '../common/ajax-functions';

export default class StockChart extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {stockData: {}};
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.stockSymbols.length!==nextProps.stockSymbols.length){
      this._fetchChartData(nextProps.stockSymbols);
    }
  }

  componentDidMount() {
    this._fetchChartData(this.props.stockSymbols);
  }

  _fetchChartData(stockSymbols){
    let appUrl = window.location.origin;
    let queryString = "";

    for(let i=0;i<stockSymbols.length;i++){
      queryString+="symbol=" + stockSymbols[i] + "&";
    }

    let apiUrl = appUrl + '/api/stockchart/?' + queryString;
    let self = this;

    ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({stockData: JSON.parse(data)});
    });   
  }

  render(){
    let HighStockChart;

    if(this.state.stockData!==undefined){
      let stockSeries = [];

      for(let i=0;i<this.state.stockData.length;i++){
        stockSeries.push({
          name: this.state.stockData[i].symbol,
          data: this.state.stockData[i].datePrice,
          tooltip: {
            valueDecimals: 2,
            valuePrefix: "$"
          }
        });
      }      

      let config = {
        rangeSelector: {
          selected: 5
        },
        title: {
          text: "Stocks"
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: stockSeries
      };

      HighStockChart = <ReactHighstock config={config} />;
    }

    return(
      <div id="chart-container">
        {HighStockChart}
      </div>
    );
  }
}