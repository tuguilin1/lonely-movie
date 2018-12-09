import React,{Component} from "react"
import { Carousel,Button } from 'antd-mobile'
import PropTypes from "prop-types"
import "./index.scss"

export default class Mostconcerned extends Component{
	static contextTypes = {
		history:PropTypes.object
	}
	constructor(props){
		super(props);
		this.state = {
			slideIndex:0
		}
	}
	changeUrl = (movieId)=>{
		this.context.history.push(`/movie/${movieId}`)
	}
	render(){
		let {list,futrueData} = this.props
		return(
			<div className="most-concerned">
				<nav>
					最受关注
				</nav>
				<section>
				<Carousel className="space-carousel"
			          frameOverflow="visible"
			          slideWidth={0.85}
			          afterChange={index => this.setState({ slideIndex: index })}
			          dots={false}
			          style={{
			          	height:"13rem"
			          }}
			    >
			    {
			    	list.map((item,index)=>{
			    		return <div key={index} className="hot-movie" onClick={this.changeUrl.bind(this,item.id)} style={{
			                display: 'block',
			                position: 'relative',
			                top: this.state.slideIndex === index ? -20 : 0,
			                height: "11rem",
			                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
			             }}>
			             <div className="hot-movie-img">
			             	<img src={item.image} />
			             </div>
			             <div className="hot-movie-info">
			             	<p className="hot-movie-title">{item.title}</p>
			             	<p className="hot-movie-type"><span>{item.wantedCount}</span>人想看—{item.type}</p>
			             	<p className="hot-movie-director">导演：{item.director}</p>
			             	<p className="hot-movie-actor">演员：{item.actor1}{" "}{item.actor2}</p>
			             	<div className="hot-movie-sale">
			             		<div className="sale-1">超前预售</div>
			             		<div className="sale-2">预告片</div>
			             	</div>
			             </div>
					    </div>
			    	})
			    }
				    
		        </Carousel>
		        </section>
		        <nav>
		        	即将上映
		        </nav>
		        <section>
		        	{
		        		futrueData.map((item,index)=>{
				    		return <div key={index} className="hot-movie futrue-movie" onClick={this.changeUrl.bind(this,item.id)} >
				             <div className="hot-movie-img">
				             	<img src={item.image} />
				             </div>
				             <div className="hot-movie-info">
				             	<p className="hot-movie-title">{item.title}</p>
				             	<p className="hot-movie-type"><span>{item.wantedCount}</span>人想看—{item.type}</p>
				             	<p className="hot-movie-director">导演：{item.director}</p>
				             	<p className="hot-movie-actor">演员：{item.actor1}{" "}{item.actor2}</p>
				             	<div className="hot-movie-sale">
				             		<div className="sale-1">超前预售</div>
				             		<div className="sale-2">预告片</div>
				             	</div>
				             </div>
						    </div>
				    	})
		        	}
		        </section>
			</div>
		)
	}

}