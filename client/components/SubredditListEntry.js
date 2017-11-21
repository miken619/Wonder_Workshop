var SubredditListEntry = (props) => (
    <div className="subreddit-list-entry">
      <div className="media-left media-middle">
        <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt="" />
      </div>
      <div className="media-body">
        <div className="subreddit-list-entry-title" onClick={function() { props.handleClick(props.video); }}>{props.video.snippet.title}</div>
        <div className="subreddit-list-entry-detail">{props.video.snippet.description}</div>
      </div>
    </div>
  );