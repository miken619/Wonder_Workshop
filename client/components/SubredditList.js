var SubredditList = (props) => (
    <div className="subreddit-list media">
      {props.videos.map(val => 
        <VideoListEntry video={val} handleClick={props.handleClick}/>
      )}
    </div>
  );
  
