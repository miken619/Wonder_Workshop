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

function timeDifference(time) {
    let delta = Math.abs((Date.now() / 1000) - time);

    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    let hours =  Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;

    let result = '';

    if(days >= 1) {
        result += days + ' day';
        if(days > 1) result += 's';
    } else if (hours >= 1) {
        result += hours + ' hour';
        if(hours > 1) result += 's';
    } else {
        result += minutes + ' minute';
        if(minutes > 1) result += 's';
    }

    return result;
}

function parseData(res) {
    let arr = res.data.data.children;
    console.log('arr', arr);
    console.log('data', res.data.data);
    
    let result = arr.map((val) => {
        return {
            author: val.data.author,
            permalink: 'https://www.reddit.com' + val.data.permalink,
            score: val.data.score,
            subreddit: val.data.subreddit,
            title: val.data.title,
            created: timeDifference(val.data.created_utc),
            comments: val.data.num_comments
        };
    });
    return result;
}