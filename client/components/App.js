import React, { Component } from 'react';

import Nav from './Nav';
import SubredditList from './SubredditList';
import SubredditPost from './SubredditPost';

import { getSubreddit } from '../lib/searchForSubreddit';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSubreddits: [],
            allSubredditsPost: []
        }

        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount() {
        let cb = (res) => {
            console.log('res is ', res);
        }

        getSubreddit('news', cb);
    }

    onClickHandler(props) {
        this.setState({currentVideo: props});          
    }

    onCancelHandler(props) {
        this.setState({currentVideo: props});          
    }

    onSubmitHandler(val) {
        console.log('val is ' + val);
    }

    render() {
        return (
            <div> 
                <Nav handleSubmit={this.onSubmitHandler}/>
                <div className="col-md-9">
                    <SubredditPost subreddit={this.state.allSubreddits}/>
                </div>
                <div className="col-md-3">
                    <SubredditList subreddit={this.state.allSubreddits} handleCancel={this.onCancelHandler}/>
                </div>
            </div>
        );
    }
}