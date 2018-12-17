import Movie from "./movie";
import cinema from "./cinema"
import createStore from "./redux";
import combineReducers from "./combinereducers"
let store = createStore(combineReducers({Movie,cinema}),{})

export {store}