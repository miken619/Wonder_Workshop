import React from 'react';

const SubredditsPostEntry = (props) => (
    <div className="subreddit-list-entry">
      <div>
        <b>{props.val.subreddit.toUpperCase()}</b>
      </div>
      <div>
        <a href={props.val.permalink}>  <b>{props.val.title}</b></a>
      </div>
      <div>
        <span> Submitted {props.val.created} ago</span>
        <span> Posted by <b>{props.val.author}</b></span>
        
      </div>
      <span> {props.val.comments} comments</span>

      
    </div>
);

export default SubredditsPostEntry;