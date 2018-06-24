import { combineReducers } from 'redux'
import { ADD_POST, ADD_COMMENT, REQ_CATEGORIES, UPVOTE_POST, DOWNVOTE_POST } from "../Actions/actions";

const comment = (state = {}, action) => {
  const { comments } = action;
  switch (action.type) {
    case ADD_COMMENT:
    
      return {
        ...state,
        comments
      }
    default:
      return state;
  }
}

const post = (state = {}, action) => {
  const { post } = action;
  switch (action.type) {
    case ADD_POST:
    
      return {
        ...state,
        [post.id] : post
      }
    case UPVOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore + 1
        }
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore - 1
        }
      }
    default:
      return state;
  }
};

const categories = (state = {}, action) => {
  const { categories } = action;
  switch (action.type) {
    case REQ_CATEGORIES:

      return {
        ...state,
        categories
      }
    default:
      return state;
  }
}

export default combineReducers({
  post,
  comment,
  categories
})

// export default post;