import React,{Component} from "react"
import "./index.scss"
export default class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			index:0
		}
	}
	changeActive = (index)=>{
		if(index === this.state.index){
			return null
		}
		this.setState({
			index:index
		})
		switch(index){
			case 0:
				this.props.push("/index/movie");
				break;
			case 1:
				this.props.push("/index/cinema");
				break;
			default:
				break;
		}
	}
	render(){
		let list=["首页","购票","商城","发现"]
		return(
			<header className="header">
				<div className="logo"></div>
				<div className="list">
					{list.map((item,index)=>{
						return <p onClick={this.changeActive.bind(this,index)} className={index === this.state.index?"active":""} key={index}>{item}</p>
					})}
				</div>
				<div className="user"></div>
			</header>
		)
	}
}