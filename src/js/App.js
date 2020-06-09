import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const App = (props) => {

  const [searchString, updateSearchString] = useState();

  const handleChange = event => {
    event.preventDefault();
    updateSearchString(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (searchString && searchString.trim() != '') {
      props.actions.getUserList(searchString);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
        <Form onSubmit={handleSubmit}>
          <FormControl
            type="text"
            className="searchInput"
            placeholder="Search for an user"
            onChange={event => handleChange(event)}
          />
          </Form>
        </Col>
      </Row>
      <Row>
        {props.usersData && props.usersData.items && props.usersData.items.length && props.usersData.items.map((user) =>
          <Col key={user.id} sm={4}>
            <Card>
              <Card.Img variant="top" src={user.avatar_url} />
              <Card.Body>
                <Card.Title>{user.login}</Card.Title>
                <Card.Link href={user.html_url} target="_userProfile">view profile</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
  usersData: state.searchUsers.userList || {}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
