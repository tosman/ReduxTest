import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';  
import assign from 'lodash/object/assign';  
import mapValues from 'lodash/object/mapValues';

const initialState = {
  friends: [1],
  friendsById: {
    1: {
      id: 1,
      name: 'Theodore Roosevelt'
    }
  }
}

const actionMapping = {
  [types.ADD_FRIEND]: addFriend,
  [types.DELETE_FRIEND]: deleteFriend,
  [types.STAR_FRIEND]: starFriend,
  default: state => state
}

export default function friends(state = initialState, action) {
  return (actionMapping[action.type] || actionMapping['default'])(state, action);
}

function deleteFriend(state, action){ 
    return { 
      friends: state.friends.filter(id => id !== action.id), 
      friendsById: omit(state.friendsById, action.id)
    };
}

function starFriend(state, action){
  return { 
    ...state, 
    friendsById: mapValues(state.friendsById, (friend) => {
      return (friend.id === action.id ? {...friend, starred: !friend.starred} : friend)
    })
  }
}

function addFriend(state, action) {
  const newId = state.friends.length + 1;
  return {
    friends: [...state.friends, newId],
    friendsById: {...state.friendsById,
     [newId]: {id: newId, 
      name: action.name}
    }
  };
}

