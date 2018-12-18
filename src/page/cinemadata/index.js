import React,{Component} from "react"
import {getCinemaData} from "../../ajax/api"
import {store} from "../../redux"
import "./index.scss"
export default class CinemaData extends Component{
	constructor(props){
		super(props);
		this.state={
			cinemaData:store.getState().cinema||{},
			left:0,
			activeNum:0,
			isTouch:false,
			movies:[]
		}
		this.startX = 0;
		this.startLeft = 0

	}
	getdata = async (cinemaId)=>{
		let data = await getCinemaData(cinemaId);
		console.log(data);
		this.setState({
			movies:data.data.data.movies
		})
	}
	componentWillMount(){
		this.setState({
			left:document.body.clientWidth/2-32
		})
		let data = store.getState().cinema
		if(!data){
			this.setState({
				cinemaData:JSON.parse(sessionStorage.getItem("cinemaData"))
			})
		}else{
			sessionStorage.setItem("cinemaData",JSON.stringify(data))
		}
	}
	componentDidMount(){
		this.getdata(this.props.param.cinemaId)
	}
	touchStart = (e)=>{
		this.startX = e.touches[0].clientX;
		this.startLeft = this.state.left;
		this.setState({
			isTouch:true
		})
	}
	touchMove = (e)=>{
		this.setState({
			left:this.startLeft+e.changedTouches[0].clientX - this.startX
		})
	}
	touchEnd = (e)=>{
		let endX = e.changedTouches[0].clientX;
		let width = endX-this.startX;
		let len = this.state.movies.length;
		let index = Math.ceil(Math.abs(width)/80);
		this.setState({
			isTouch:false
		})

		if(width<0){
			if(len-index>this.state.activeNum){
				this.setState({
					activeNum:this.state.activeNum+index,
					left:this.state.left-index*80+Math.abs(width)
				})
			}else{
				this.setState({
					activeNum:len-1,
					left:this.state.left+Math.abs(width)
				})
			}
		}else if(width>0){
			if(this.state.left >= document.body.clientWidth/2-32){
				this.setState({
					activeNum:0,
					left:document.body.clientWidth/2-32
				})
			}else{
				this.setState({
					activeNum:this.state.activeNum-index,
					left:this.state.left+index*80-Math.abs(width)
				})
			}
		}
	}
	render(){
		return(
			<div className="cinema-data">
				<header>
					<div className="cinema-data-left">
						<p className="cinema-name">
							{this.state.cinemaData.cinameName}
						</p>
						<p className="cinema-address">
							{this.state.cinemaData.address}
						</p>
						<p className="cinema-tag">
							<span>观影小食</span>
							<span>3D</span>
							<span>可停车</span>
						</p>
					</div>
					<div className="cinema-data-right">
						<div className="cinema-iphone">
						</div>
						<div className="cinema-icon">
						</div>
					</div>
				</header>
				<section className="movies">
					<div className="movie-scroll" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
						<ul style={{
							transform:`translateX(${this.state.left}px)`
						}} className={this.state.isTouch?"":"transit"}>
						{
							this.state.movies.map((item,index)=>{
								return (
									<li key={index} className={this.state.activeNum==index?"active":""}>
										<img src={item.img} />
									</li>
								)
							})
						}							
						</ul>
					</div>
				</section>
			</div>
		)
	}
}