import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

//import { fetchSources } from '../utils/api';
//import { fillWithKeys, fillFromOptions } from '../utils/util';
import { fillFromOptions } from '../utils/util';

import {Row, Col, Form, Container} from 'react-bootstrap';

// A form to get User Preferences to personalize their news feed
const UserPreferenceScreen = ({categories, authors, sources}) => {
    //const [sources, setSources] = useState([]);
    const [cookies, setCookie] = useCookies(['preferences']);
    const [userPreferences, setUserPreferences] = useState({
        categories: cookies.categories || [],
        sources: cookies.sources || [],
        authors: cookies.authors || [],
    });

    useEffect(() => {
        setCookie('preferences', userPreferences, { path: '/' });
    }, [userPreferences, setCookie]);

    const handleChange = async (event) => {
        const name = event.target.name;
        const options = [...event.target.selectedOptions];
        const values = fillFromOptions(options);
        /*if(name === "categories") {
            const json = await fetchSources(values);
            const sources = fillWithKeys({
                allowedKeys: ["id", "name"], 
                convertKeys: ["id", "name"], 
                prevData: json
            });
            setSources(sources);
        }*/

        setUserPreferences((prevData) => ({
          ...prevData,
          [name]: values,
        }));
    };

    return (
        <Container>
            <div className="jumbotron">
                <h1 className="display-4">My Preferences</h1>
                <p className="lead">Select your preferred Categories, Sources and Authors for a better 
                experience.</p>
                <hr className="my-4" />
                <p>You can select multiple options from each of them.</p>
            </div>

            <Form>
                <Form.Group as={Row} className="mb-3 justify-content-md-center" controlId="formHorizontalCategories">
                    <Form.Label column sm={3}>Categories</Form.Label>
                    <Col sm={4}>
                        <Form.Control as="select" defaultValue={[...userPreferences.categories]} multiple size="sm" name="categories" aria-label="Categories" htmlSize={4} onChange={handleChange}>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Control>
                    </Col>

                </Form.Group>
                <Form.Group as={Row} className="mb-3 justify-content-md-center" controlId="formHorizontalSources">
                    <Form.Label column sm={3}>Sources</Form.Label>
                    <Col sm="4">
                        <Form.Control defaultValue={[...userPreferences.sources]} as="select" multiple size="sm" htmlSize={4} name="sources" aria-label="Sources" onChange={handleChange}>
                            {sources.map((source, index) => (
                                <option key={index} value={source.id}>{source.name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 justify-content-md-center" controlId="formHorizontalAuthors">
                    <Form.Label column sm={3} className="mb-3">Authors</Form.Label>
                    <Col sm={4}>
                        <Form.Control defaultValue={[...userPreferences.authors]} as="select" multiple size="sm" htmlSize={4} name="authors" aria-label="Authors" onChange={handleChange}>
                            {authors.map((author, index) => (
                                <option key={index} value={author.id}>{author.name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default UserPreferenceScreen;