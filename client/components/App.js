import React, { Component } from 'react';

import Nav from './Nav';
import SubredditList from './SubredditList';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSubreddits: []
        }

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onSubmitHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(props) {
        this.setState({currentVideo: props});          
    }

    onSubmitHandler(props) {
        
    }

    render() {
        return (
            <div> 
                <Nav handleSubmit={this.onSubmitHandler}/>
                <div className="col-md-7">
                    
                </div>
                <div className="col-md-5">
                    <SubredditList subreddit={this.state.allSubreddits} handleClick={this.onClickHandler}/>
                </div>
            </div>
        );
    }
}