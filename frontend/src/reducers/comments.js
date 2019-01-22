import {GET_ALL_COMMENTS, ADD_COMMENT, DELETE_COMMENT, VOTE_COMMENT, EDIT_COMMENT} from "../action/comments";

export default function comments(state = {}, action) {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case ADD_COMMENT:
            return{
                ...state,
                [action.comments.id]: action.comments,
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.comments]: {deleted : true},
            }
        case VOTE_COMMENT:
            return{
                ...state,
                [action.comments.id]: action.comments,
            }
        case EDIT_COMMENT:
            return{
                ...state,
                [action.comments.id]: action.comments,
            }
        default:
            return state
    }
}