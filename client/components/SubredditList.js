import React from 'react';

import SubredditListEntry from './SubredditListEntry';

const SubredditList = (props) => (
    <div className="subreddit-list media">
      {props.subreddit.map(val => 
        <SubredditListEntry subreddit={val} onCancelHandler={props.onCancelHandler}/>
      )}
    </div>
);

export default SubredditList;

