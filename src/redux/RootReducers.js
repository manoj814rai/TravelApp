import {combineReducers} from "redux";
import fligthReducer from './slices/FlightSlices';

export const rootReducers = combineReducers({
    fligthReducer: fligthReducer,
});