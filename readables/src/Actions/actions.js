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

export const upVotePost = post => ({
  type: UPVOTE_POST,
  post
});

export const upVotePostAPI = id => dispatch => {
  socialAPI
    .upVotePost(id)
    .then(data => dispatch(upVotePost(data)))
}

export const downVotePost = (post) => ({
  type: DOWNVOTE_POST,
  post
});

export const downVotePostAPI = id => dispatch => {
  socialAPI
    .downVotePost(id)
    .then(data => dispatch(downVotePost(data)))
}

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

export const recievePosts = post => ({
  type: ADD_POST,
  post
})

export const getPosts = () => dispatch =>{
  socialAPI
    .getPosts()
    .then(data => data.map(post => dispatch(recievePosts(post))))
}
