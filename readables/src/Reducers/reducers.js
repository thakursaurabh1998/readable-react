import { combineReducers } from 'redux'
import { ADD_POST, ADD_COMMENT, REQ_CATEGORIES } from "../Actions/actions";

// const postState = {
//   posts: {
//   }
// };

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
  const { posts, categories } = action;
  switch (action.type) {
    case ADD_POST:
    
      return {
        ...state,
        posts
      }
    case REQ_CATEGORIES:

      return {
        ...state,
        categories
      }
    default:
      return state;
  }
};

export default combineReducers({
  post,
  comment
})

// export default post;