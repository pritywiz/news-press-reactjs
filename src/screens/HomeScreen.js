import React, { useState, useEffect } from 'react';

import NewsList from '../components/NewsList';
import FilterForm from '../components/FilterForm';

import { requestsArticle } from '../utils/api';
import { newsListTransform } from '../utils/util';

import {Row, Col, Container} from 'react-bootstrap';

// Home Screen that displays the Filter and the News Feed
const HomeScreen = (props) =>  {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData(props); 
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const [filterData, setFilterData] = useState({
        keyword: '',
        category: props.category || '',
        source: '',
        author: '',
        from_date: '',
        to_date: ''
    });

    const fetchData = async ({keyword, category, from_date, to_date}) => {
        if (loading) return; // Do not fetch if already fetching data
        setLoading(true);
        try {
          // Call API with pagination
          const responses = await requestsArticle({page, keyword, category, from_date, to_date});
          const data = newsListTransform(responses);
          // Update state with new data
          setNewsList((prevData) => [...prevData, ...data.list]);
          // Update page number
          setPage(page + 1);
          // Check if there is more data available
          if (data.resultCount === 0) {
            setHasMore(false);
          }
         } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    
      // Callback function to handle form submission
      const submitFilter = (filterDataSent) => {
        try {
          // Clear existing data and fetch new data after form submission
          setNewsList([]);
          setPage(1);
          setHasMore(true);
          const {keyword, category, from_date, to_date } = filterDataSent;
          fetchData({keyword, category, from_date, to_date });
          setFilterData({ ...filterDataSent});
        } catch (error) {
        }
      };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <FilterForm onSubmit={submitFilter} />
                </Col>
                <Col md={9}>
                  <Row className="overflow-auto p-3">
                    <NewsList newsList={newsList} {...filterData} />
                    {loading && <p>Loading...</p>}
                    {!loading && hasMore && (
                      <p className="text-center" style={{ cursor: 'pointer' }} onClick={fetchData}>
                        Load More
                      </p>
                    )}
                    {!loading && !hasMore && <p>No more data available.</p>}
                  </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeScreen;
