import React from 'react';

import SubredditsPostEntry from './SubredditsPostEntry';

const SubredditsPost = (props) => (
    <div className="subreddit-list media">
      {props.subredditsPost.map((val, key) => 
        <SubredditsPostEntry val={val} key={key} handleClick={props.handleClick}/>
      )}
    </div>
);

export default SubredditsPost;
