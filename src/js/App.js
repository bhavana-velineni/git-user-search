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
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';

const App = (props) => {

  const [searchString, updateSearchString] = useState();
  const [loading, updateLoading] = useState(false);
  const [pageNo, updatePageNo] = useState(0);

  const [perPage] = useState(20);

  useEffect(() => {
    updateLoading(true);
    (async () => {
      await props.actions.getUserList(searchString, perPage, pageNo);
      updateLoading(false);
    })();
  }, [searchString, pageNo]);

  const handleSubmit = event => {
    if (event.key === "Enter") {
      updatePageNo(1);
      updateSearchString(event.target.value);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
          <FormGroup>
            <InputGroup>
              <FormControl
                type="input"
                className="searchInput"
                placeholder="Search for an user"
                onKeyPress={event => handleSubmit(event)}
              />
            </InputGroup>
          </FormGroup>
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
      <Row>
        <Col>
          {props.usersData && pageNo > 1 ?
            <Button className='button-prev' onClick={() => { updatePageNo(pageNo => pageNo - 1); }} > Prev </Button> : null}
        </Col>
        <Col>
          {props.usersData && props.usersData.total_count > perPage ?
            <Button className='button-next' onClick={() => { updatePageNo(pageNo => pageNo + 1); }} > Next </Button> : null}
        </Col>
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
