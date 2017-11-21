import React from 'react';

import SubredditListEntry from './SubredditListEntry';

const SubredditList = (props) => (
    <div className="subreddit-list media">
      {props.subreddit.map(val => 
        <SubredditListEntry subreddit={val} handleClick={props.handleClick}/>
      )}
    </div>
);

export default SubredditList;

