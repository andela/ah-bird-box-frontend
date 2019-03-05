import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    const { simpleAction } = this.props;
    simpleAction(text);
  }

  render() {
    const { text } = this.props;
    return (
      <div className="App">
        <input
          onChange={this.handleChange}
          type="text"
        />
        <p>
          {text && text.text}
        </p>
      </div>
    );
  }
}
App.propTypes = {
  simpleAction: PropTypes.shape({}).isRequired,
  text: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ text }) => ({ text });
const mapDispatchToProps = dispatch => ({
  simpleAction: text => dispatch(actions.simpleAction(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
