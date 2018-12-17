export default function cinema(state={},action){
	switch(action.type){
		case "CHANGECINEMA":
			return action.payload;
		default:
			return state
	}
}