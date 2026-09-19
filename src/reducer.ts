import {combineReducers} from 'redux';
import {loginSlice} from "./features/login/loginSlice";

const rootReducer = combineReducers({
    login: loginSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;