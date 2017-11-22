import axios from 'axios';

export function getSubreddit(subreddit, cb, list, post, count) {
    if(list.includes(subreddit)) return;

    const limit = 25;
    let api = `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;

    axios.get(api)
         .then(res => {
            let latestPost = parseData(res);
            let result;
            if(list.length > 1) result = sortPost(latestPost, post);
            else result = latestPost;
            cb(list.concat(subreddit), result);
         })
         .catch(err => {
             console.log('Error getting subreddit ' + subreddit, err);
         });
}

function sortPost(latestPost, post) {
    let arrConcat = latestPost.concat(post);
    arrConcat.sort((o1, o2) => {
        return o1.score - o2.score;
    });
    return arrConcat;
}

function parseData(res) {
    let arr = res.data.data.children;
    let result = arr.map((val) => {
        return {
            author: val.data.author,
            permalink: 'https://www.reddit.com' + val.data.permalink,
            score: val.data.score,
            subreddit: val.data.subreddit,
            title: val.data.title
        };
    });
    return result;
}