import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useCookies } from 'react-cookie';

// A form to filter the news data from. Gets the options from User Preferences.
const FilterForm = ({onSubmit}) => {
    const [cookies] = useCookies(['preferences']);
    const [userPreferences] = useState({
        categories: cookies.preferences.categories || [],
        sources: cookies.preferences.sources || [],
        authors: cookies.preferences.authors || [],
    });
    const [filterData, setFilterData] = useState({
        keyword: '',
        category: '',
        source: '',
        author: '',
        from_date: '',
        to_date: '',
    });

    const handleSubmit = (event) => {
        //const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        onSubmit(filterData);
    }

    /*getData = async (category) => {
        const sources  = await fetchSource(category);
        setSources(sources);
        setIsLoaded(true);
    }*/

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Control name="keyword" placeholder='Keywords' size="sm" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Select size="sm" name="category" aria-label="Category" onChange={handleChange}>
                            <option value="">Select Category</option>
                            {userPreferences.categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Select size="sm" name="source" aria-label="Source" onChange={handleChange}>
                            <option value="">Select Source</option>
                            {userPreferences.sources.map((source, index) => (
                                <option key={index} value={source.id}>{source.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Select size="sm" name="author" aria-label="Author" onChange={handleChange}>
                            <option value="">Select Author</option>
                            {userPreferences.authors.map((author, index) => (
                                <option key={index} value={author.id}>{author.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column>From Date</Form.Label>
                    <Col>
                        <Form.Control size="sm" aria-label="From Date" type="date" name="from_date" onChange={handleChange}/>
                    </Col>
                    <Form.Label column>To Date</Form.Label>
                    <Col>
                        <Form.Control size="sm" aria-label="To Date" type="date" name="to_date" onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Button size="sm" type="submit">Search</Button>
                    </Col>
                </Form.Group>
            </Row>
        </Form>
    );

}

export default FilterForm;