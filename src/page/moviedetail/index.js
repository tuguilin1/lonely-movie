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
			if(top-document.documentElement.scrollTop<0){
				this.setState({
					isfix:true
				})
			}else{
				
				this.setState({
					isfix:false
				})
			}
		},10)
		window.addEventListener("scroll",this.fn)
		this.getMovieInfo()
	}
	componentWillUnmount(){
		window.removeEventListener("scroll",this.fn)
	}
	changeActive = (e)=>{
		switch(e.target.innerHTML){
			case "简介":
				this.setState({
					activeNum:0,
					left:"16%"
				});
				break;
			case "长评":
				this.setState({
					activeNum:1,
					left:"50%"
				})
				break;
			case "短评":
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
			longComments:data[3].data.comments[0]||{},
			photos:data[2].data,
			isShow:true
		})
	}
	render(){
		console.log(1)
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
				<section className="movie-content">
					<nav className={this.state.isfix?"fix":""} ref="nav">
						<ul className="nav" onClick={this.changeActive}>
							{["简介","长评","短评"].map((item,index)=>{
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
					<div className="movie-intro" style={{height:this.state.height}}>
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
					<div className="total-players">
						<span>共{this.state.photos.length}张剧照</span>
					</div>
					<div className="short-comments">
						<header>
							网友短评({this.state.comments.length})
						</header>
						<ul className="comments">
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
					<div className="long-comments">
						<header>
							精选长评
						</header>
						<div className="comments">
							<div className="comments-name">
								{this.state.longComments.title}
							</div>
							<div className="comments-content">
								{this.state.longComments.content}
							</div>
							<div className="comments-user">
								<div className="user-pic">
									<img src={this.state.longComments.headurl} />
								</div>
								<p className="user-name">
									{this.state.longComments.nickname}
								</p>
								<p className="rating">
									评分
								</p>
								<span>{this.state.longComments.rating}</span>
							</div>
						</div>
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

