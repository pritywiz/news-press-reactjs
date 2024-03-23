import React from 'react';

import Col from 'react-bootstrap/Col';

import NewsCard from './NewsCard';

// Component that filters the news based on the form input and calls NewsCard for each news.
const NewsList = ({newsList, source, author, from_date, to_date}) => {
    const list = [];
    let fromDt = (from_date) ? new Date(from_date) : null;
    let toDt = (to_date) ? new Date(to_date) : null;

    // filter for content after retrieving from the api
    newsList.forEach((news) =>  {
        if(news.source && news.source.toLowerCase().indexOf(source.toLowerCase()) === -1)
            return;
        if(news.author && news.author.toLowerCase().indexOf(author.toLowerCase()) === -1)
            return;
        let newsDt = new Date(news.publishedDate);
        if(fromDt && toDt && (newsDt < fromDt || newsDt > toDt))
            return;
        list.push(news);
    });

    return (
        <>
        {list.map((news, index) => {
            return (
                <Col key={index}><NewsCard news={news} /></Col>
            );
        })}
        </>
    );
};
export default NewsList;