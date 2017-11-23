import React from 'react';

const SubredditsListEntry = (props) => (
    <div className="subreddit-list-entry">
      <button className="btn hidden-sm-down" onClick={() => {props.onCancelHandler(props.val);}}>{ props.val }
        <span className="glyphicon glyphicon-remove"></span>
      </button>
    </div>
);

export default SubredditsListEntry;