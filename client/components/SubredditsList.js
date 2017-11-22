import React from 'react';

import SubredditsListEntry from './SubredditsListEntry';

const SubredditsList = (props) => (
    <div className="subreddit-list media">
      {props.subredditsList.map((val, key) => 
        <SubredditsListEntry val={val} key={key} onCancelHandler={props.onCancelHandler}/>
      )}
    </div>
);

export default SubredditsList;

