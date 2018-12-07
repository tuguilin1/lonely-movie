import React,{Component} from "react"
import "./index.scss"




export default class Moviedetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeNum:0,
			isfix:false,
			left:"16%"
		}
	}
	componentDidMount(){
		let top = this.refs.nav.offsetTop
		let fn = debounce(()=>{
			if(top-document.documentElement.scrollTop<0){
				this.setState({
					isfix:true
				})
			}else{
				
				this.setState({
					isfix:false
				})
			}
		},5)
		window.addEventListener("scroll",fn)
	}
	shouldComponentUpdate(nextprops,nextstate){
		return this.state.isfix !== nextstate.isfix||this.state.activeNum !== nextstate.activeNum
	}
	changeActive = (e)=>{
		switch(e.target.innerHTML){
			case "简介":
				console.log(1)
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
	render(){
		return(
			<div className="movie-detail">
				<section className="movie-detail-top">
				</section>
				<section className="movie-detail-info">
					<div className="movie-info">
						<div className="movie-info-img">
							<div className="play">
							</div>
							<img src="http://img5.mtime.cn/mt/2018/11/23/093305.73817166_1280X720X2.jpg"/>
						</div>
						<div className="movie-info-right">
							<p className="movie-name">
							无名之辈</p>
							<p className="movie-name-en">
								A Cool Fish
							</p>
							<p className="movie-type">
								喜剧/剧情
							</p>
							<p className="movie-time">
								108分钟
							</p>
							<p className="movie-date">
								2018年11月16日中国上映 
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