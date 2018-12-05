export default function createStore(reducer,initialstate){
	let state = initialstate;
	let listeners = [];

	function getState(){
		return state
	}

	function subscribe(listener){
		listeners.push(listener);
		return function(){
			let index = listeners.indexOf(listener);
			listeners.splice(index,1)
		}
	}

	function dispatch(action){
		state = reducer(state,action);
		listeners.forEach((listener)=>{
			listener()
		})
	}

	return {
		dispatch,
		getState,
		subscribe
	}
}