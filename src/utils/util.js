//Util file that contains some functions

export const fillWithKeys = ({allowedKeys, convertKeys, prevData}) => {
    const newData = prevData.map(item => {
        const newObject = {};
        allowedKeys.forEach((key, index) => {
            newObject[key] = item[convertKeys[index]];
        });
        return newObject;
    });
    return newData;
};

export const fillFromOptions = (prevData) => {
    const newData = prevData.map(item => {
        return {id:item.value, name: item.text};
    });
    return newData;
};

// transforms the response from the different api into a single structure
// this could be done using better DRY approach
export const newsListTransform = (newsData) => {
    //[{data: newsapi}, {data: nytimes}, {data: guardian}]
    const newsList = {list:[], resultCount: 0};
    let newsapi = newsData[0];
    let nytimes = newsData[1];
    let guardian = newsData[2];
    if(newsapi && newsapi.status === "ok" && newsapi.articles) {
        const newsapiArticles = newsapi.articles.map((doc) => (
        {
            id: doc._id,
            title: doc.title,
            url: doc.url,
            urlImage: doc.urlToImage ? doc.urlToImage : '',
            description: doc.description,
            publishedDate: doc.publishedAt,
            author: doc.author,
            source: doc.source.name
        }));
        newsList.list = newsList.list.concat(newsapiArticles);
        newsList.resultCount += newsapi.totalResults;
    } 
    if(nytimes && nytimes.status === "OK" && nytimes.response.docs) {
        const nytimesDocs = nytimes.response.docs.map((doc) => (
        {
            id: doc._id,
            title: doc.headline.main,
            url: doc.web_url,
            urlImage: doc.multimedia[0] ? "https://www.nytimes.com/" + doc.multimedia[0].url : '',
            description: doc.snippet,
            publishedDate: doc.pub_date,
            author: doc.byline.original,
            source: doc.source
        }));
        newsList.list = newsList.list.concat(nytimesDocs);
        newsList.resultCount += nytimes.response.meta.offset;
    } 
    if(guardian && guardian.response.status === "ok" && guardian.response.results) {
        const guardianResults = guardian.response.results.map((doc) => (
        {
            id: doc.id,
            title: doc.webTitle,
            url: doc.webUrl,
            urlImage: doc.fields.thumbnail || '',
            description: doc.fields.trailText || '',
            publishedDate: doc.webPublicationDate,
            author: doc.fields.byline || '',
            source: "The Guardian"
        }));
        newsList.list = newsList.list.concat(guardianResults);
        newsList.resultCount += guardian.response.total;
    }
    return newsList;
};