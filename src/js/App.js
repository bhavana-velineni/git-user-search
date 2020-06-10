import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const App = (props) => {

  const [searchString, updateSearchString] = useState();
  const [loading, updateLoading] = useState(false);
  const [pageNo, updatePageNo] = useState(1);

  const [perPage] = useState(20);

  const handleChange = event => {
    event.preventDefault();
    updateSearchString(event.target.value);
  }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    updateLoading(true);
    (async () => {
      await props.actions.getUserList(searchString, perPage, pageNo);
      updateLoading(false);
    })();
  }

  const handleClick = () => {
    event.preventDefault();
    updatePageNo(pageNo + 1);
    handleSubmit();
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
      {!loading ?
        <>
          <Row>{props.usersData && props.usersData.total_count ?
            <Alert className='alert' variant='success'>
              Your seach for <b>'{searchString}'</b> returned <b>{props.usersData.total_count}</b> matches.
      </Alert> : null}
          </Row>
          <Row>
            {props.usersData && props.usersData.total_count ? props.usersData.items.map((user) =>
              <Col key={user.id} sm={3}>
                <Card className="card">
                  <Card.Img variant="top" src={user.avatar_url} />
                  <Card.Body>
                    <Card.Title>{user.login}</Card.Title>
                    <Card.Link href={user.html_url} target="_userProfile">view profile</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ) : props.usersData.total_count === 0 ? <Alert className='alert' variant='warning'>
              Your seach for <b>'{searchString}'</b> returned <b>{props.usersData.total_count}</b> matches.
    </Alert> : null}
          </Row></> : <Spinner animation="border" />}
          <Row>{props.usersData && props.usersData.total_count > perPage ?
            <Button className='button-next' onClick={handleClick}> Next </Button> : null}
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
