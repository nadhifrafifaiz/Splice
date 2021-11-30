import axios from "axios";
import { API_URL } from "../../helper";

export const getAllPosts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "FETCH_ALL_POSTS_ONGOING"
            })
            const postsData = await axios.get(`${API_URL}/posts`)

            dispatch({
                type: "FETCH_ALL_POSTS_SUCCESS",
                payload: postsData.data
            })

        } catch (error) {
            dispatch({
                type: "FETCH_ALL_POSTS_FAILED",
                payload: error
            })
        }
    }
}