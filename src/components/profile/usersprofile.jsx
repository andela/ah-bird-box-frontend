import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';

import cuid from 'cuid';
import * as userProfiles from '../../actions/fetchProfileAction';
import followUnfollow from '../../api/followUnfollowApi';
import RetrieveUserProfilesAPI from '../../api/fetchProfileApi';
import Loader from '../loader';
import '../../styles/profile.scss';


const CardExampleCard = (props) => {
  const {
    profile, unFollowClick, followers, followClick,
  } = props;
  let isFollowed = false;
  followers.forEach((follower) => {
    if (follower.username === profile.username) {
      isFollowed = true;
    }
  });
  return (
    <div className="col-sm-4">
      <Card id="card">
        <Image src="https://picsum.photos/200/300?image=0" />
        <Card.Content>
          <Card.Header>{profile.username}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2019</span>
          </Card.Meta>
          <Card.Description>{profile.bio}</Card.Description>
        </Card.Content>
        {isFollowed ? (
          <Button id="edit" onClick={event => unFollowClick(event, profile)} compact>
            unfollow
          </Button>
        ) : (
          <Button id="edit" onClick={event => followClick(event, profile)} compact>
            follow
          </Button>
        )}
      </Card>
    </div>
  );
};

const username = localStorage.getItem('username');

class ViewUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      followStatus: 'Follow',
      followers: [],
      following: [],
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.listProfiles.profiles().then(() => {
      this.setState({
        showProfile: true,
      });
    });

    RetrieveUserProfilesAPI.retrieveUserFollowers(username).then((response) => {
      this.setState({
        followers: response.data.Followers,
        following: response.data.Following,
      });
    });
  }

  followClick = (event, profile) => {
    this.setState({
      follow: true,
    });
    return followUnfollow.follow(profile.username);
  };

  unFollowClick = (event, profile) => followUnfollow.unFollow(profile.username);

  render() {
    {
      if (!this.state.showProfile) {
        return (
          <div>
            <Loader />
          </div>
        );
      }
      const { profiles } = this.props;
      const { followStatus, following, followers } = this.state;
      return (
        <div>
          <div>
            <div className="container">
              <h2>profiles</h2>
              <div className="row">
                {profiles.map(profile => (
                  <CardExampleCard
                    key={cuid()}
                    profile={profile}
                    followStatus={followStatus}
                    following={following}
                    followers={followers}
                    followClick={this.followClick}
                    unFollowClick={this.unFollowClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

CardExampleCard.propTypes = {
  actions: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  followClick: PropTypes.func.isRequired,
  unFollowClick: PropTypes.func.isRequired,
  followers: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    profiles: state.profiles.users,
  };
}

const mapDispatchToProps = dispatch => ({
  actions: {
    listProfiles: bindActionCreators(userProfiles, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewUsersPage);
