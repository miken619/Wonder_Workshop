import React, { Component } from 'react';

import Nav from './Nav';
import SubredditsList from './SubredditsList';
import SubredditsPost from './SubredditsPost';

import { addSubreddit,  
         updateSubreddit, 
         removeSubreddit,
         pagination} from '../lib/searchForSubreddit';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 10,
            allSubredditsList: [],
            allSubredditsPost: []
        }
        this.updateState = this.updateState.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            
            this.setState({page: (this.state.page + 10)});
            console.log('At the bottom' + this.state.page);
            pagination(this.updateState, this.state.allSubredditsList, this.state.allSubredditsPost, this.state.page);        
        } else {
            console.log('Not at the bottom');
        }
      }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        addSubreddit('news', this.updateState, this.state.allSubredditsList, this.state.allSubredditsPost, this.state.page);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

    updateState(list, post) {
        this.setState({allSubredditsList: list,
                       allSubredditsPost: post});
    }

  

    onCancelHandler(val) {
        removeSubreddit(val, this.updateState, this.state.allSubredditsList, this.state.allSubredditsPost);   
    }

    onSubmitHandler(val) {
        addSubreddit(val.toLowerCase(), this.updateState, this.state.allSubredditsList, this.state.allSubredditsPost, this.state.page);

    }

    render() {
        return (
            <div> 
                <Nav handleSubmit={this.onSubmitHandler}/>
                <div className="col-md-3">
                    <SubredditsList subredditsList={this.state.allSubredditsList} onCancelHandler={this.onCancelHandler}/>
                </div>
                <div className="col-md-9">
                    <SubredditsPost subredditsPost={this.state.allSubredditsPost}/>
                </div>
                
            </div>
        );
    }
}