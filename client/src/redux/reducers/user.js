const init_state = {
    username: "",
    email: "",
    roleId: 0,
    id: 0,
    isActive: false,
    message: "",
    loading: false,
    success: false,
    error: "",
    isLogin: false
}


const reducer = (state = init_state, { type, payload }) => {
    switch (type) {
        case "FETCH_USER_ONGOING":
            return { ...state, loading: true, success: false }
        case "FETCH_USER_SUCCESS":
            return { ...state, ...payload, loading: false, success: true }
        case "FETCH_USER_FAILED":
            return { ...state, ...payload, loading: false }
        case "CLEAR_MESSAGE":
            return { ...state, loading: false, success: false, error: "", message: "" }
        case "USER_LOGOUT":
            return { ...init_state, isLogin: false };
        default:
            return state
    }
}


export default reducer