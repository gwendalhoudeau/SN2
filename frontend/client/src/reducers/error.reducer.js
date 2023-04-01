import { GET_POST_ERROR } from "../actions/post.actions";

const initialState={postErrors:[]}

export default function errorReducer (state=initialState,action) {
    switch(action.type) {
        case GET_POST_ERROR:
            return{
                postError:action.payload,
                userError: []
            }

        default:
            return state
    }
}