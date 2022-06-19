import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../actions/actions";
import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <Form.Control 
    className="filter-form"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search Movie Titles"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);