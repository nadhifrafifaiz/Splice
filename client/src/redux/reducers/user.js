const init_state = {
    username: "",
    email: "",
    role: 0,
    id: 0,
    isActive: false,
    message: "",
    loading: false,
    success: false,
    error: ""
}


const reducer = (state = init_state, { type, payload }) => {
    switch (type) {
        case "FETCH_USER_ONGOING":
            return { ...state, loading: true, success: false }
        case "FETCH_USER_SUCCESS":
            return { ...state, ...payload, loading: false }
        case "FETCH_USER_FAILED":
            return { ...state, ...payload, loading: false }
        default:
            return state
    }
}


export default reducer