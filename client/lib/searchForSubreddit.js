import axios from 'axios';

export function addSubreddit(subreddit, cb, list, post, page) {
    for(let i = 0; i < list.length; ++i) {
        if(list[i].subreddit === subreddit) return;
    }
    
    getSubreddit(subreddit, cb, list, post, null, page, false);

    
}

export function pagination(cb, list, post, page) {   
    console.log('After is ' + list[0].after);
    for(let i = 0; i < list.length; ++i) {
        getSubreddit(list[i].subreddit, cb, list, post, list[i].after, page, true);  
    }
}

export function removeSubreddit(subreddit, cb, list, post, page) { 
    let updatedList = list.filter((val) => {
        return val.subreddit != subreddit;
    });
    let updatedpost = post.filter((val) => {
        return val.subreddit != subreddit;
    });

    for(let i = 0; i < updatedList.length; ++i) {
        getSubreddit(updatedList[i].subreddit, cb, updatedList, updatedpost, updatedList[i].after, page, true);  
    }
    

}

//https://www.reddit.com/r/news/hot.json?limit=10&count=10&after=t3_7etdft

function getSubreddit(subreddit, cb, list, post, after, page, flag) {
    //const limit = 10;
    let api = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${page}`;

    if(flag) api += `&count=${page}&after=${after}`;
    
    
    axios.get(api)
         .then(res => {
            let result = parseData(res);
            let latestPost;
            let latestList;

            if(flag) latestList = updateAfter(result.list, list);
            else latestList = list.concat(result.list);

            latestPost = sortPost(result.post, post, page);
         
            cb(latestList, latestPost);
         })
         .catch(err => {
             console.log('Error getting subreddit ' + subreddit, err);
         });
}

function updateAfter(latestlist, list) {
    let flag = false;
    for(let i = 0; i < list.length; ++i) {
        if(latestlist.subreddit === list[i].subreddit) {
            list[i].after = latestlist.after
            flag = true;
        }
    }
   
    return (flag) ? list: list.concat(latestlist);
}

function sortPost(latestPost, post, page) {
    let arrConcat = post.concat(latestPost); 
   
    arrConcat.sort((o1, o2) => {
        return o2.score - o1.score;
    });

    return arrConcat.slice(0, page);
}

function updateCount(list, post) {
    for(let i = 0; i < post.length; ++i) {
        for(let j = 0; j < list.length; ++j) {
            if(post[i].subreddit == list[j].subreddit) {
                list[j].count = ++list[j].count;
            }
          
        }
    }
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
    console.log('Arr is ', arr);
    let after = res.data.data.after;
    console.log('Arr is ', res.data.data);
    let subreddit = arr[0].data.subreddit;

    let list = {};
    list.after = after;
    list.subreddit = subreddit;


    let post = arr.map((val) => {
        return {
            author: val.data.author,
            permalink: 'https://www.reddit.com' + val.data.permalink,
            score: val.data.score,
            subreddit: subreddit,
            title: val.data.title,
            created: timeDifference(val.data.created_utc),
            comments: val.data.num_comments
        };
    });
    
    return {list,
            post};
}