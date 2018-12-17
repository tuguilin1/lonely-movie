import React,{Component} from "react"
import {getCinemaData} from "../../ajax/api"
import {store} from "../../redux"
export default class CinemaData extends Component{
	constructor(props){
		super(props);
		this.state={
			cinemaData:store.getState().cinema||{}
		}
	}
	getdata = async (cinemaId)=>{
		let data = await getCinemaData(cinemaId);
		
	}

	componentDidMount(){
		console.log(this.state.cinemaData)
	}

	render(){
		return(
			<div className="cinema-data">123</div>
		)
	}
}