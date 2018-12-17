
let initialstate = []

export default function Movies(state = initialstate,action){
	switch(action.type){
		case "CHANGEMOVIES":
			return [...action.payload];
		default:
			return state
	}
}