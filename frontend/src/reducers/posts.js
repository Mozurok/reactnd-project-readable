import {GET_ALL_POST, GET_ALL_CATEGORY_POST, VOTE_POST, ADD_POST, DELETE_POST, POST_COMMENT_COUNT, EDIT_POST} from "../action/posts";

export default function posts(state = {}, action) {
    switch (action.type) {
        case GET_ALL_POST:
            return {
                ...state,
                ...action.posts
            }
        case GET_ALL_CATEGORY_POST:
            return{
                ...state,
                ...action.posts
            }
        case VOTE_POST:
            return{
                ...state,
                [action.posts.id]: action.posts,
            }
        case ADD_POST:
            return{
                ...state,
                [action.posts.id]: action.posts,
            }
        case DELETE_POST:
            return {
                ...state,
                [action.posts]: {deleted : true},
            }
        case POST_COMMENT_COUNT:
            return{
                ...state,
                [action.posts.id]: {
                    ...state[action.posts.id],
                    commentCount: state[action.posts.id].commentCount + action.posts.count,
                }
            }
        case EDIT_POST:
            return{
                ...state,
                [action.posts.id]: action.posts,
            }
        default:
            return state
    }
}