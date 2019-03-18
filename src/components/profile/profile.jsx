/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Grid, Table, Image, Button, Modal,
} from 'semantic-ui-react';
import EditProfile from './editprofile';

import * as profileActions from '../../actions/profileAction';
import '../../styles/profile.scss';

const username = localStorage.getItem('username')


class Profile extends React.Component {
  state = {
    fetched: false,
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfile(username).then(() => {
      this.setState({
        fetched: true,
      });
    });
  }

  render() {
    if (!this.state.fetched) {
      return <h1>Loading...</h1>;
    }
    const { profile } = this.props;

    return (
      <div>
        <Grid id="grid_system" centered columns={3}>
          <h2 id="username">
            {profile.username}
            {' '}
          </h2>
          <Grid.Column>
            <Modal trigger={<Button>Edit Profile</Button>} closeIcon className="modal close">
              <Modal.Content>
                <EditProfile />
              </Modal.Content>
            </Modal>
            <Image
              className="profile__image"
              circular
              size="small"
              src={profile.image}
              floated="right"
              style={{ width: '130px', height: '130px' }}
            />
          </Grid.Column>
        </Grid>
        <h2 id="personal-info">Personal Information</h2>
        <Table basic="very" celled collapsing id="pull-right">
          <Table.Body>
            <Table.Row />
            <Table.Row>
              <Table.Cell className="padding">Bio</Table.Cell>
              <Table.Cell>{profile.bio}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="padding">Location</Table.Cell>
              <Table.Cell>{profile.location}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="padding">Company</Table.Cell>
              <Table.Cell>{profile.company}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="padding">Phone</Table.Cell>
              <Table.Cell>{profile.phone}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="padding">Website</Table.Cell>
              <Table.Cell>{profile.website}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

Profile.propTypes = {
  actions: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
