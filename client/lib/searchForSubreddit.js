import axios from 'axios';

export function getSubreddit(subreddit, cb) {
    const limit = 25;
    let api = `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;

    axios.get(api)
         .then(res => {
            cb(res);
         })
         .catch(err => {
             console.log('Error getting subreddit ' + subreddit, err);
         });
}