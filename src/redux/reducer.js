
let initialstate = []

export default function reducer(state = initialstate,action){
	switch(action.type){
		case "CHANGEMOVIES":
			return [...action.payload];
		default:
			return state
	}
}