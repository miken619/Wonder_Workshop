import React from 'react';

import SubredditPostEntry from './SubredditPostEntry';

const SubredditPost = (props) => (
    <div className="subreddit-list media">
      {props.subreddit.map(val => 
        <SubredditListEntry subreddit={val} handleClick={props.handleClick}/>
      )}
    </div>
);

export default SubredditPost;
