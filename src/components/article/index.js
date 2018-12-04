import React,{Component} from "react"
import {getIndexAticle,getNowMovie} from "../../ajax/api"

export default class Article extends Component{
	constructor(props){
		super(props)
	}
	getArticle = async ()=>{
		let data = await getIndexAticle();
		let data2 = await getNowMovie();
		console.log(data);
		console.log(data2)
	}
	render(){
		this.getArticle();
		return(
			<div>123</div>
		)
	}
}