import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

// Component that displays different news in a block.
const NewsCard = ({news}) => {
    return (
    <Card style={{ width: '18rem' }} className="mb-3">
        <Card.Img variant="top" src={news.urlImage} />
        <Card.Body>
            <Card.Title>{news.title}</Card.Title>
            <Card.Subtitle>{moment(new Date(news.publishedDate)).fromNow()} {news.author || ''}</Card.Subtitle>
            <Card.Text>{news.description || ''}</Card.Text>
            <Button variant="primary" as="a" href={news.url}>More..</Button>
        </Card.Body>
    </Card> 
    );       
}
export default NewsCard;