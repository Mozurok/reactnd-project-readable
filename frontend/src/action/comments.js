import {getPostComments, addComment, deleteComment, voteComment, editComment} from "../utils/ReadableAPI"
import {handlerAddPostCommentCount} from "./posts";
import {showLoading, hideLoading} from 'react-redux-loading'
const uuidv1 = require('uuid/v1')

export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

function addCommentToPost(comments){
    return{
        type: ADD_COMMENT,
        comments,
    }
}

export function handlerAddCommentToPost(data) {
    return (dispatch) => {
        dispatch(showLoading())
        data.id = uuidv1()
        console.log(data)
        return addComment(data)
            .then((categories) => {
                dispatch(addCommentToPost(categories))
                dispatch(handlerAddPostCommentCount(data.parentId, 1))
            })
            .then(() => dispatch(hideLoading()))
    }

}

function editCommentAction(comments) {
    return {
        type: EDIT_COMMENT,
        comments,
    }
}

export function handlerEditComment(id, body, timestamp) {
    return (dispatch) => {
        dispatch(showLoading())
        return editComment(id, {
            timestamp,
            body,
        })
            .then((posts) => dispatch(editCommentAction(posts)))
            .then(() => dispatch(hideLoading()))
    }

}

function deleteCommenttAction(comments) {
    return {
        type: DELETE_COMMENT,
        comments,
    }
}

export function handlerDeleteComment(id, parentId) {
    return (dispatch) => {
        dispatch(showLoading())
        return deleteComment(id)
            .then(() => dispatch(deleteCommenttAction(id)))
            .then(() => dispatch(handlerAddPostCommentCount(parentId, -1)))
            .then(() => dispatch(hideLoading()))

    }

}

function addCommentVote(comments) {
    return {
        type: VOTE_COMMENT,
        comments,
    }
}

export function handlerAddCommentVote(vote) {
    return (dispatch) => {
        dispatch(showLoading())
        return voteComment(vote.id, vote.option)
            .then((comments) => dispatch(addCommentVote(comments)))
            .then(() => dispatch(hideLoading()))
    }

}

function getComments(comments){
    return{
        type: GET_ALL_COMMENTS,
        comments,
    }
}

export function handlerGetPostComments(data) {
    return (dispatch) => {
        dispatch(showLoading())
        return getPostComments(data.id)
            .then((categories) => {
                const categoriesFinal = [];
                categories.forEach((a) => {
                    categoriesFinal[a.id] = a;
                })
            dispatch(getComments(categoriesFinal))
        })
             .then(() => dispatch(hideLoading()))
    }

}