import { combineReducers } from "redux";
import ContentReducer from "../Components/redux/Contentreducer";

const rootReducer = combineReducers({
  content: ContentReducer,
});

export default rootReducer;
