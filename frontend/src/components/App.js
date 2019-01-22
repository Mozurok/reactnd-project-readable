import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Switch } from 'react-router'
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MainPage from './MainPage'
import CreatePost from './CreatePost'
import DetailsPost from './DetailsPost'
import {handlerGetAllPosts} from "../action/posts";
import {handlerGetAllCategories} from "../action/categories";

class App extends Component {
  state = {
      isVoteSort: true,
      isTimeSort: false,
  }
  componentDidMount(){
    this.props.dispatch(handlerGetAllPosts())
    this.props.dispatch(handlerGetAllCategories())
  }
  changePostSort = (sortBy) =>{
    if(sortBy === 'vote'){
      this.setState({
          isVoteSort: true,
          isTimeSort: false,
      });
    }else{
      this.setState({
          isVoteSort: false,
          isTimeSort: true,
      });
    }
  }
  render() {
    return (
        <Router>
          <Fragment>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Projeto Readable - Udacity - Bruno Mazurok
                </Typography>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path='/' exact render={(props) => <MainPage {...props}
                                                                 isVoteSort={this.state.isVoteSort}
                                                                 isTimeSort={this.state.isTimeSort}
                                                                 changePostSort={(e) => {this.changePostSort(e)}} />} />
              <Route path='/create/post' exatc component={CreatePost} />
              <Route path='/:category' exact render={(props) => <MainPage {...props}
                                                                          isVoteSort={this.state.isVoteSort}
                                                                          isTimeSort={this.state.isTimeSort}
                                                                          changePostSort={(e) => {this.changePostSort(e)}} />} />
              <Route path='/:category/:id' exact component={DetailsPost} />
            </Switch>
          </Fragment>
        </Router>
    );
  }
}

export default connect()(App);
