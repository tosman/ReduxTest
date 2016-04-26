import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddFriendInput from '../components/AddFriendInput'
import FriendList from '../components/FriendList'
import * as FriendsActions from '../actions/FriendsActions';

@connect(state => ({
  friendlist: state.friendlist
}))
export default class FriendListApp extends Component {

  static propTypes = {
    friendsById: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
      const { friendlist: { friendsById }, dispatch } = this.props;
      const actions = bindActionCreators(FriendsActions, dispatch);
      return (
        <div className={styles.friendListApp}>
          <h1>The FriendList</h1>
          <AddFriendInput addFriend={actions.addFriend} />
          <FriendList friends={friendsById} actions={actions}/>
        </div>
      );
    }
  }
