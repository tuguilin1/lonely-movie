import React,{Component} from "react"

export default class loadMore extends Component{
	constructor(props){
		super(props);
		this.startY = 0;
		this.endY = 0;
		this.state={
			shift:0
		}
	}
	touchStart = (e)=>{
		this.startY = e.touches[0].pageY;
	}
	touchMove = (e)=>{
		let moveY = e.changedTouches[0].pageY;
		if(moveY >= this.startY){
			return;
		}
		let scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
		let dataHeight = this.refs.load.offsetTop + this.refs.load.clientHeight;
		let screenHeight = document.documentElement.clientHeight;
		if(dataHeight <=scrollTop+screenHeight){
			
			let y = Math.abs(moveY-this.startY)>100?100:Math.abs(moveY-this.startY)
			this.setState({
				shift:y
			})
		}
	}
	touchEnd = (e)=>{
		this.endY = e.changedTouches[0].pageY;
		if(this.state.shift !== 0){
			if(this.state.shift > 50){
				this.props.load()
			}
			this.setState({
				shift:0
			})
			
		}
	}
	render(){
		return(
			<div className="load-more" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove} ref="load" style={{transform:`translateY(-${this.state.shift}px)`}}>
				{this.props.children}
			</div>
		)
	}

}