import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const App = (props) => {

  const [searchString, updateSearchString] = useState();

  useEffect(() => {
    if (searchString && searchString.trim() != '') {
      props.actions.getUserList(searchString);
    }
  }, [searchString]);

  const handleChange = event => {
    event.preventDefault();
    updateSearchString(event.target.value);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="5">
          <FormControl
            type="text"
            className="searchInput"
            placeholder="Search for an user"
            onChange={event => handleChange(event)}
          />
          {props.usersData.total_count}
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

