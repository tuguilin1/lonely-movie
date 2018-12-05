import React,{Component} from "react"
import {getIndexAticle} from "../../ajax/api"
import "./index.scss"

export default class Article extends Component{
	constructor(props){
		super(props);
		this.state={
			hotPoints:[]
		}
	}
	getArticle = async ()=>{
		let data = await getIndexAticle();
		console.log(data);
		this.setState({
			hotPoints:data.data.hotPoints
		})
	}
	componentDidMount(){
		this.getArticle()
	}
	render(){
		return(
			<div className="article">
				<header>
					今日热点
				</header>
				<ul className="news">
					{this.state.hotPoints.map((item,index)=>{
						return(
							<li key={index}>
								<div className="news-img">
									<img src={item.img} alt={item.desc}/>
								</div>
								<div className="news-info">
									<p className="news-name">
										{item.title}
									</p>
									<p className="news-desc">
										{item.desc}
									</p>
									<p className="news-time">
									</p>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}