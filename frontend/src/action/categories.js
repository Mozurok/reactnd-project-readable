import {getAllCategories} from "../utils/ReadableAPI"
import {showLoading, hideLoading} from 'react-redux-loading'


export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

function getCategories(categories){
    return{
        type: GET_ALL_CATEGORIES,
        categories,
    }
}

export function handlerGetAllCategories() {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllCategories()
            .then((categories) => dispatch(getCategories(categories)))
            .then(() => dispatch(hideLoading()))
    }

}