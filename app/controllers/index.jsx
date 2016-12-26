import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import ajaxFunctions from '../common/ajax-functions';

render(<Layout />, document.getElementById('stock-market-app'));