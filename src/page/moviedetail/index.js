import React,{Component} from "react"
import {Icon} from "antd-mobile"
import {getMovieDetail} from "../../ajax/api"

import "./index.scss"


let top

export default class Moviedetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeNum:0,
			isfix:false,
			left:"16%",
			height:"3rem",
			movieData:{},
			comments:[],
			longComments:{},
			photos:[],
			isShow:false,
		}
	}
	componentDidUpdate(){
		if(this.refs.nav){
			top = this.refs.nav.offsetTop>0?this.refs.nav.offsetTop:top
		}
		
	}
	componentDidMount(){
		
		top = document.documentElement.scrollTop
		this.fn = debounce(()=>{
			let scrollTop = document.documentElement.scrollTop
			if(top-scrollTop<0){
				this.setState({
					isfix:true
				})
			}else{
				
				this.setState({
					isfix:false
				})
			}
			if(this.refs.short){
				if(scrollTop>=0&&scrollTop<this.refs.short.offsetTop){
					this.setState({
						activeNum:0,
						left:"16%"
					})
				}else if(scrollTop>=this.refs.short.offsetTop&&scrollTop<this.refs.long.offsetTop){
					this.setState({
						activeNum:1,
						left:"50%"
					})
				}else{
					this.setState({
						activeNum:2,
						left:"83%"
					})
				}
			}
			
		},0)
		window.addEventListener("scroll",this.fn)
		this.getMovieInfo()
	}
	componentWillUnmount(){
		window.removeEventListener("scroll",this.fn)
	}
	shouldComponentUpdate(nextprops,nextstate){
		let arr = ["activeNum","isfix","height","isShow"]
		for(var item of arr){
			if(nextstate[item] !== this.state[item]){
				return true
			}
		}
		return false
	}
	changeActive = (e)=>{
		switch(e.target.innerHTML){
			case "简介":
				this.refs.intro.scrollIntoView()
				this.setState({
					activeNum:0,
					left:"16%"
				});
				break;
			case "短评":
				this.refs.short.scrollIntoView()
				this.setState({
					activeNum:1,
					left:"50%"
				})
				break;
			case "长评":
				this.refs.long.scrollIntoView()
				this.setState({
					activeNum:2,
					left:"83%"
				})
		}
	}
	changeHeight = ()=>{
		this.state.height === "3rem"?this.setState({
			height:"auto"
		}):this.setState({
			height:"3rem"
		})
	}
	getMovieInfo = async ()=>{
		let data = await getMovieDetail(this.props.param.movieid);
		console.log(data)
		this.setState({
			movieData:data[0].data.data.basic,
			comments:data[1].data.cts,
			longComments:data[3].data.comments,
			photos:data[2].data,
			isShow:true
		})
	}
	render(){
		if(!this.state.isShow){
			return null
		}
		let {actors,img,mins,story,name,nameEn,releaseArea,type} = this.state.movieData
		return(
			<div className="movie-detail">
				<section className="movie-detail-top">
				</section>
				<section className="movie-detail-info">
					<div className="movie-info">
						<div className="movie-info-img">
							<div className="play">
							</div>
							<img src={img}/>
						</div>
						<div className="movie-info-right">
							<p className="movie-name">
							{name}</p>
							<p className="movie-name-en">
								{nameEn}
							</p>
							<p className="movie-type">
								{type.join("/")}
							</p>
							<p className="movie-time">
								{mins}
							</p>
							<p className="movie-date">
								{releaseArea}
							</p>
						</div>
					</div>
				</section>
				<section className="movie-content" ref="intro">
					<nav className={this.state.isfix?"fix":""} ref="nav">
						<ul className="nav" onClick={this.changeActive}>
							{["简介","短评","长评"].map((item,index)=>{
								return <li key={index} className={this.state.activeNum  === index?"active":""}>{item}</li>
							})}
						</ul>
						<div className="linear">
							<div className="line" style={{left:this.state.left}}>
							</div>
						</div>
					</nav>
					<div className={this.state.isfix?"show":"not-show"}>
					</div>
					<div className="movie-intro"  style={{height:this.state.height}}>
						<span>{story}</span>
					</div>
					<div className="intro-nav" onClick={this.changeHeight}>
						<Icon  type={this.state.height === "3rem"?"down":"up"} size="lg" />
					</div>
					<div className="wrap-movie-player">
					<div className="movie-player">
						<header>
							演职人员
						</header>
						<div className="players">
						{
							actors.map((item,index)=>{
								return(
									<div key={index}>
										<img src={item.img}/>
										<p className="player-name">
											{item.name}
										</p>
										<p className="player-role">
											饰  {item.rolename}
										</p>
									</div>
								)
							})
						}
							
							
						</div>
					</div>
					</div>
					<div className="total-players">
						<span>全部{actors.length}位演职人员</span>
					</div>
					<div className="movie-photo">
						<header>
							剧照
						</header>
						<div className="wrap-photos">
							<div className="photos">
							{
								this.state.photos.map((item)=>{
									return (
										<div key={item.id}>
											<img alt="剧照" src={item.image} />
										</div>
									)
								})
							}
								
																
							</div>
						</div>
					</div>
					<div className="total-players" ref="short">
						<span>共{this.state.photos.length}张剧照</span>
					</div>
					<div className="short-comments" >
						<header>
							网友短评({this.state.comments.length})
						</header>
						<ul className="comments" >
						{
							this.state.comments.map((item,index)=>{
								return(
									<li key={item.tweetId}>
										<div className="user-img">
											<img src={item.caimg}/>
										</div>
										<div className="comments-info">
											<p className="user-name">
												<span>{item.ca}</span>
											</p>
											<p className="comments-content">
												{item.ce}
											</p>
											<p className="action">
												<span className="reply">回复</span>
												<span className="agree">{item.commentCount}</span> 
											</p>
										</div>
									</li>
								)
							})
						}
							
						</ul>
					</div>
					<div className="long-comments" ref="long">
						<header>
							精选长评
						</header>
						{
							this.state.longComments.slice(0,4).map((item,index)=>{
								return(
									<div className="comments" key={index}>
										<div className="comments-name">
											{item.title}
										</div>
										<div className="comments-content">
											{item.content}
										</div>
										<div className="comments-user">
											<div className="user-pic">
												<img src={item.headurl} />
											</div>
											<p className="user-name">
												{item.nickname}
											</p>
											<p className="rating">
												评分
											</p>
											<span>{item.rating}</span>
										</div>
									</div>
								)
							})
						}
						
					</div>
				</section>
			</div>
		)
	}
}

function debounce(fn,delay){
	let context = this;
	let timer
	return function (){
		if(timer){
			clearTimeout(timer);
			timer = setTimeout(()=>{
				fn.apply(context)
			},delay)
		}else{
			timer = setTimeout(()=>{
				fn.apply(context)
			},delay)
		}
	}
}

