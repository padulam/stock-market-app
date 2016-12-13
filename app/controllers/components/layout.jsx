import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import ajaxFunctions from '../../common/ajax-functions';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined
    }

    this._AuthenticateTwitter = this._AuthenticateTwitter.bind(this);
  }

  _AuthenticateTwitter(){
    window.location = '/auth/twitter'
  }

  _DeauthenticateTwitter(){
    window.location = '/logout';
  }

  _GetUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var auth = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var userObject = JSON.parse(data);

      auth.setState({user: userObject});
    }));
  }

  componentWillMount() {
    this._GetUserData();
  }

  render(){
    if(!this.state.user){
      var signIn = <SignIn AuthenticateTwitter={this._AuthenticateTwitter}/>;
    }

    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#voting-app-navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">App Home</Link>
            </div>
            <div className="collapse navbar-collapse" id="voting-app-navbar">
              <ul className="nav navbar-nav navbar-right">
                {signIn}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

class SignOut extends React.Component {
  render(){
    return (<button onClick={this.props.DeauthenticateTwitter}  className="btn btn-twitter sign-out navbar-btn">
              <span className="fa fa-twitter"></span> Sign Out
            </button>);
  }
}

class SignIn extends React.Component {
  render(){
    return (<li><button onClick={this.props.AuthenticateTwitter}  className="btn btn-twitter navbar-btn">
              <span className="fa fa-twitter"></span> Sign in with Twitter
            </button></li>);
  }
}