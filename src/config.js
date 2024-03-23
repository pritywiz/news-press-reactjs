export const NEWS_API_KEY = "079efd38f1b74135b02094182eb20711";
export const GUARDIAN_API_KEY = "f47b7941-2be4-47f0-8517-9e3697c1319a";
export const NYTIMES_API_KEY = "rUC6cqNBzAzkhNG4CLl8Wq1O1QJtv3ur";
export const NYTIMES_SECRET = "LRsWo6X5HQkoq4Bw";
export const SIZE = 20;

export const categories = [
    {id: "general", name: "General"},
    {id: "books", name: "Books"},
    {id: "business", name: "Business"},
    {id: "entertainment", name: "Entertainment"},
    {id: "health", name: "Health"},
    {id: "science", name: "Science"},
    {id: "society", name: "Society"},
    {id: "sports", name: "Sports"},
    {id: "technology", name: "Technology"},
    {id: "tv-and-radio", name: "Television & radio"},
];

export const authors = [
    {id: "Matthew Holmes", name: "Matthew Holmes"},
    {id: "Rebecca Nicholson", name: "Rebecca Nicholson"},
    {id: "Sam Jordison", name: "Sam Jordison"},
    {id: "Barney Ronay", name: "Barney Ronay"},
    {id: "Alan Yuhas", name: "Alan Yuhas"},
    {id: "sports", name: "Sports"},
    {id: "technology", name: "Technology"},
];
export const sources = [
    {id: "BBC News", name: "BBC News"},
    {id: "BBC Sport", name: "BBC Sport"},
    {id: "Google News", name: "Google News"},
    {id: "New York Times", name: "New York Times"},
    {id: "The Guardian", name: "The Guardian"},
    {id: "The Washington Post", name: "The Washington Post"},
    {id: "The Washington Times", name: "The Washington Times"},
];
export const SOURCE_BASEURLS = [
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}&language=en`,
];

export const ARTICLE_BASEURLS = [
    `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`,
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYTIMES_API_KEY}`,
    `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&format=json&query-fields=body&&show-fields=trailText,thumbnail,byline`
];
