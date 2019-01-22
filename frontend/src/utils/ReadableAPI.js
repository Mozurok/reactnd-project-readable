const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

// Get all of the categories available for the app.
export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data)

// Get all of the posts for a particular category.
export const getAllCategoriePosts = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

// Get all of the posts. Useful for the main page when no category is selected.
export const getAllPost = () =>
    fetch(`${api}/posts`, { headers })
        .then((res) => res.json())
        //.then(data => data)

// Add a new post.
export const addPost = (query) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.json())
        .then(data => data)

// 	Get the details of a single post.
export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)

// Used for voting on a post.
export const votePost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    }).then(res => res.json())
        .then(data => data)

// Edit the details of an existing post.
export const editPost = (id, query) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.json())

// Sets the deleted flag for a post to 'true'. Sets the parentDeleted flag for all child comments to 'true'
export const deletePost = (id) => {
    return fetch(`${api}/posts/${id}`,
        {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
}

// Get all the comments for a single post.
export const getPostComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data)

// Add a comment to a post.
export const addComment = (query) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.json())
        .then(data => data)

// Get the details for a single comment.
export const getCommentDetails = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)

//Used for voting on a comment.
export const voteComment = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    }).then(res => res.json())
        .then(data => data)

// Edit the details of an existing comment.
export const editComment = (id, query) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.json())

// Sets a comment's deleted flag to true.
export const deleteComment = (id) => {
    return fetch(`${api}/comments/${id}`,
        {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
}