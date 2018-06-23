import * as socialAPI from '../Util/socialAPI'

export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const UPVOTE_POST = "UPVOTE_POST";
export const DOWNVOTE_POST = "DOWNVOTE_POST";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";
export const ADD_POST = "ADD_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const REQ_CATEGORIES = "REQ_CATEGORIES"


// export const likeComment = ({ id }) => ({
//   type: UPVOTE_COMMENT,
//   id
// });

// export const likePost = ({ id }) => ({
//   type: UPVOTE_POST,
//   id
// });

export const recieveCategories = categories => ({
  type: REQ_CATEGORIES,
  categories
})

export const getCategories = () => dispatch => {
  socialAPI
    .getCategories()
    .then(data => dispatch(recieveCategories(data)))
}

export const recieveComments = comments => ({
  type: ADD_COMMENT,
  comments
})

export const getComments = (id) => dispatch => {
  socialAPI
    .getComments(id)
    .then(data => dispatch(recieveComments(data)))
}

export const recievePosts = posts => ({
  type: ADD_POST,
  posts
})

export const getPosts = () => dispatch =>{
  socialAPI
    .getPosts()
    .then(data => dispatch(recievePosts(data)))
}
