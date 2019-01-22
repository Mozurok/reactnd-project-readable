import {getAllPost, getAllCategoriePosts, votePost, addPost, deletePost, editPost} from "../utils/ReadableAPI"
import {showLoading, hideLoading} from 'react-redux-loading'
const uuidv1 = require('uuid/v1')



export const GET_ALL_POST = 'GET_ALL_POST'
export const GET_ALL_CATEGORY_POST = 'GET_ALL_CATEGORY_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const POST_COMMENT_COUNT = 'POST_COMMENT_COUNT'
export const EDIT_POST = 'EDIT_POST'

function addPostAction(posts) {
    return {
        type: ADD_POST,
        posts,
    }
}

export function handlerAddPost(author, body, category, title) {
    return (dispatch) => {
        dispatch(showLoading())
        return addPost({
            id: uuidv1(),
            title,
            author,
            body,
            category,
            timestamp: Date.now(),
        })
            .then((posts) => dispatch(addPostAction(posts)))
            .then(() => dispatch(hideLoading()))
    }

}

function editPostAction(posts) {
    return {
        type: EDIT_POST,
        posts,
    }
}

export function handlerEditPost(id, body, title) {
    return (dispatch) => {
        dispatch(showLoading())
        return editPost(id, {
            title,
            body,
        })
            .then((posts) => dispatch(editPostAction(posts)))
            .then(() => dispatch(hideLoading()))
    }

}

function AddPostCommentCount(posts) {
    return {
        type: POST_COMMENT_COUNT,
        posts,
    }
}

export function handlerAddPostCommentCount(id, count) {
    return (dispatch) => {
        dispatch(showLoading())
        const posts = {id, count}
        dispatch(AddPostCommentCount(posts))
        dispatch(hideLoading())
    }

}

function getPosts(posts) {
    return {
        type: GET_ALL_POST,
        posts,
    }
}

export function handlerGetAllPosts() {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllPost()
            .then((post) => {
                /* Me arrependo deste código porém foi uma solução que achei para ordenar o array de forma correta
                para tornar o ID do objeto em key do array.
                */
                const postFinal = [];
                post.forEach((a) => {
                    postFinal[a.id] = a;
                })
                dispatch(getPosts(postFinal))
            })
            .then(() => dispatch(hideLoading()))
    }

}


function getCategoryPosts(posts) {
    return {
        type: GET_ALL_CATEGORY_POST,
        posts,
    }
}

export function handlerGetCategoryPosts(category) {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllCategoriePosts(category)
            .then((post) => dispatch(getCategoryPosts(post)))
            .then(() => dispatch(hideLoading()))
    }

}

function addPostVote(posts) {
    return {
        type: VOTE_POST,
        posts,
    }
}

export function handlerAddPostVote(vote) {
    return (dispatch) => {
        dispatch(showLoading())
        return votePost(vote.id, vote.option)
            .then((posts) => dispatch(addPostVote(posts)))
            .then(() => dispatch(hideLoading()))
    }

}

function deletePostAction(posts) {
    return {
        type: DELETE_POST,
        posts,
    }
}

export function handlerDeletePost(id) {
    return (dispatch) => {
        dispatch(showLoading())
        return deletePost(id)
            .then(() => dispatch(deletePostAction(id)))
            .then(() => dispatch(hideLoading()))

    }

}
