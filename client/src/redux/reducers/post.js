const init_state = {
    posts: [],
    loading: false,
    success: false
}

const reducer = (state = init_state, { type, payload }) => {
    switch (type) {
        case "FETCH_ALL_POSTS_ONGOING":
            return { ...state, loading: true, success: false }
        case "FETCH_ALL_POSTS_SUCCESS":
            return { ...state, posts: payload, loading: false, success: true }
        case "FETCH_ALL_POSTS_FAILED":
            return { ...state, ...payload, success: false, loading: false }

        default:
            return state
    }
}

export default reducer