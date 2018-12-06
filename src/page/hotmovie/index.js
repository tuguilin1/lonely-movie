import React,{Component} from "react"
import {store} from "../../redux"
import Search from "../../components/search"
import Movie from "../../components/movie"
import { SegmentedControl, Icon } from 'antd-mobile'
import {getFutrueMovie,getNowMovie} from "../../ajax/api"
import Mostconcerned from "../../components/mostconcerned"
import PropTypes from "prop-types"
import "./index.scss"

export default class Hotmovie extends Component{
	static contextTypes = {
		history:PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			data:store.getState(),
			isNowShow:true,
			futrueData:[],
			attention:[],
			shift:'0'
		}
	}
	navChange = async (e)=>{
		if(e.nativeEvent.selectedSegmentIndex){
			this.setState({
				shift:"-100vw"
			})
		}else{
			this.setState({
				shift:"0"
			})
		}
	}
	getfMovie = async ()=>{
		let data = await getFutrueMovie();
		this.setState({
			futrueData:data.data.moviecomings,
			attention:data.data.attention
		})
	}
	getnMovie = async ()=>{
		let data = await getNowMovie();
		this.setState({
			data:data.data.ms
		})
	}
	back = ()=>{
		this.context.history.push("/index/movie")
	}
	componentDidMount(){
		this.getfMovie();
		if(this.state.data.length === 0){
			this.getnMovie()
		}
	}
	render(){
		return(
			<div className="hotmovie">
				<header>
					<Icon size="lg" type="left"  color="white" onClick={this.back} />
					<SegmentedControl className="choice" values={['正在热映', '即将上映']} onChange={this.navChange} />
				</header>
				<Search />
				<section className="movie-list" style={{transform:`translateX(${this.state.shift})`}}>
					<div className="hot-movie-now"> 
						{this.state.data.map((item,index)=>{
							return <Movie key={index} data={item} />
						})}
					</div>
					<div className="hot-movie-futrue">
						<Mostconcerned list={this.state.attention} futrueData={this.state.futrueData} />
					</div>
				</section>
			</div>
		)
	}
}