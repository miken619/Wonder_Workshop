import React, { Component } from 'react';

import Nav from './Nav';
import SubredditsList from './SubredditsList';
import SubredditsPost from './SubredditsPost';

import { getSubreddit } from '../lib/searchForSubreddit';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSubredditsList: [],
            allSubredditsPost: []
        }
        this.callback = this.callback.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        
    }

    componentDidMount() {
        getSubreddit('news', this.callback, this.state.allSubredditsList, this.state.allSubredditsPost);
    }

    callback(list, post) {
        console.log('Post', post);
        this.setState({allSubredditsList: list,
                       allSubredditsPost: post});
    }

    onClickHandler(props) {
        this.setState({currentVideo: props});          
    }

    onCancelHandler(props) {
        this.setState({currentVideo: props});          
    }

    onSubmitHandler(val) {
        console.log('User entered ' + val);

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