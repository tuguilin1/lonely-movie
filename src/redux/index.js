import Reducer from "./reducer";
import createStore from "./redux";

let store = createStore(Reducer,[])

export {store}