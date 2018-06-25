import * as socialAPI from '../Util/socialAPI'

export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const UPVOTE_POST = "UPVOTE_POST";
export const DOWNVOTE_POST = "DOWNVOTE_POST";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";
export const ADD_POST = "ADD_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const REQ_CATEGORIES = "REQ_CATEGORIES"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"


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

export const downVotePost = post => ({
  type: DOWNVOTE_POST,
  post
});

export const downVotePostAPI = id => dispatch => {
  socialAPI
    .downVotePost(id)
    .then(data => dispatch(downVotePost(data)))
}

export const upVoteComment = comment => ({
  type: UPVOTE_COMMENT,
  comment
});

export const upVoteCommentAPI = id => dispatch => {
  socialAPI
    .upVoteComment(id)
    .then(data => dispatch(upVoteComment(data)))
}

export const downVoteComment = comment => ({
  type: DOWNVOTE_COMMENT,
  comment
});

export const downVoteCommentAPI = id => dispatch => {
  socialAPI
    .downVoteComment(id)
    .then(data => dispatch(downVoteComment(data)))
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

export const recieveComments = comment => ({
  type: ADD_COMMENT,
  comment
})

export const recievePosts = post => ({
  type: ADD_POST,
  post
})

export const getPosts = () => dispatch =>{
  socialAPI
    .getPosts()
    .then(data => data.map(post => dispatch(recievePosts(post))))
}

export const getPostById = id => dispatch => {
  socialAPI
    .getPostsById(id)
    .then(data => dispatch(recievePosts(data)))
}

export const getCommentsByPost = postId => dispatch => {
  socialAPI
    .getComments(postId)
    .then(data => data.map(comment => dispatch(recieveComments(comment))))
}

export const postComment = comments => dispatch => {
  const {comment, name, id} = comments
  socialAPI
    .comment(comment, name, id)
    .then(data =>dispatch(recieveComments(data)))
}

export const deleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
});

export const deleteCommentAPI = id => dispatch => {
  socialAPI
    .deleteComment(id)
    .then(data => dispatch(deleteComment(data)))
}

export const deletePost = post => ({
  type: DELETE_POST,
  post
});

export const deletePostAPI = id => dispatch => {
  socialAPI
    .deletePost(id)
    .then(data => dispatch(deletePost(data)))
}

export const postPost = posts => dispatch => {
  const {title, body, name, category} = posts
  console.log(posts)
  socialAPI
    .post(title, body, name, category)
    .then(data =>dispatch(recievePosts(data)))
}