import React, { useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CookiesProvider, useCookies } from 'react-cookie';

import UserPreferenceScreen from './screens/UserPreferenceScreen';
import HomeScreen from './screens/HomeScreen';
import {categories, authors, sources} from './config';

//Main App Component that calls the different screens based on the routes.
const App = () => {
  const [cookies] = useCookies(['preferences']);
  const [userPreferences] = useState({
    categories: cookies.preferences.categories || []
  });
  return (
    <CookiesProvider>
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">
        <img alt="NewsPress" src="./logo.png" className="d-inline-block align-top"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {userPreferences.categories.map((category, index) => (
            <Nav.Link key={index} href={`/${category.id}`}>{category.name}</Nav.Link>
          ))}
        </Nav>
        <Nav className="justify-content-end navbar navbar-dark bg-primary" activeKey="/home">
          <Nav.Link href="/preferences">Preferences</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeScreen category={''} keyword={'apple'} />} />
      <Route path="/preferences" element={<UserPreferenceScreen categories={categories} authors={authors} sources={sources} />} />
      {categories.map((category, index) => (
        <Route key={index} path={`/${category.id}`} element={<HomeScreen category={category.id} keyword={''} />} />
      ))}      
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );

}

export default App;