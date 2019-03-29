/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Grid, Table, Image, Button, Modal, Icon,
} from 'semantic-ui-react';
import EditProfile from './editprofile';

import * as profileActions from '../../actions/profileAction';
import Loader from '../loader';
import '../../styles/profile.scss';
import RetrieveUserProfilesAPI from '../../api/fetchProfileApi';

const username = localStorage.getItem('username');

class Profile extends React.Component {
  state = {
    fetched: false,
    followers: [],
    following: [],
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfile(username).then(() => {
      this.setState({
        fetched: true,
      });
    });

    RetrieveUserProfilesAPI.retrieveUserFollowers(username).then((response) => {
      this.setState({
        followers: response.data.Followers,
        following: response.data.Following,
      });
    });
  }

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    const { profile } = this.props;


    return (
      <div>
        <div>
          <Grid id="grid_system" centered columns={3}>
            <h2 id="username">
              {profile.username}
              {' '}
            </h2>
            <Grid.Column>
              <Image
                className="profile__image"
                circular
                size="small"
                src="https://picsum.photos/200/300"
                floated="right"
                style={{ width: '130px', height: '130px' }}
              />
              <Modal trigger={<Button>Edit Profile</Button>} closeIcon className="modal close">
                <Modal.Content>
                  <EditProfile />
                </Modal.Content>
              </Modal>

            </Grid.Column>
          </Grid>
          <div className="row" id="followers">
            <h5 className="col-sm-6">
              <Icon className="users icon" />
              <Link to="/profiles">Following</Link>
              {` ${this.state.followers.length}`}
            </h5>
            <h5 className="col-sm-6">
              <Icon className="users icon" />
              Followers
              {` ${this.state.following.length}`}
            </h5>
          </div>
          <h4 id="personal-info">Personal Info</h4>
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
