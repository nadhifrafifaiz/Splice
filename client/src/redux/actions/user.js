import axios from "axios";
import { API_URL } from "../../helper";

export const registerUser = (data) => {
    return async (dispatch) => {
        try {

            dispatch({
                type: "FETCH_USER_ONGOING"
            })

            const { username, email, password } = data
            const registerResponse = await axios.post(`${API_URL}/auth/register`, {
                username, email, password
            })
            dispatch({
                type: "FETCH_USER_SUCCESS",
                payload: registerResponse.data
            })
            console.log(registerResponse);
        } catch (error) {
            dispatch({
                type: "FETCH_USER_FAILED",
                payload: error
            })
            console.log(error);
        }
    }
}