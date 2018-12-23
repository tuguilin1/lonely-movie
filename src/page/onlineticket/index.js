import React,{Component} from "react"
import {getSeatData} from "../../ajax/api"
import "./index.scss"

export default class Onlineticket extends Component{
	constructor(props){
		super(props);
		this.state={
			height:0
		}
		this.seated={}
	}
	getData = async (id)=>{
		let data = await getSeatData(id);
		console.log(data.data);
		return data.data
	}
	touchEnd = (e)=>{
		console.log(e.changedTouches[0]);
		let {pageX,pageY} = e.changedTouches[0];
		let X = Math.round((pageX-16)*2/this.seatWidth)-1;
		let Y = Math.round((pageY-198)/30)-1;
		console.log(X,Y);
		if(!this.seated[`${X}-${Y}`]){
			this.ctx.clearRect((X+1)*this.seatWidth,195+Y*60,this.seatWidth,60);
			this.ctx.fillStyle = "red";
			this.ctx.fillRect((X+1)*this.seatWidth,200+Y*60,this.seatWidth-4,this.seatWidth-4);
			this.ctx.globalCompositeOperation="source-over";
			this.ctx.fillRect((X+1)*this.seatWidth+5,195+Y*60,this.seatWidth-14,this.seatWidth-4);
			this.seated[`${X}-${Y}`] = 1
		}
	}
	async componentDidMount(){
		let canvas = this.refs.canvas;
		let ctx = canvas.getContext("2d");
		this.ctx = ctx
		let width = document.body.clientWidth-32;
		let {seat,seatColumnCount,seatRowCount} =await this.getData(439233109)
		let seatWidth = Math.floor(width*2/seatColumnCount);
		console.log(seatWidth)
		this.seatWidth = seatWidth
		setTimeout(()=>{
			seat.forEach((item)=>{
				if(item.id === 0){
					return
				}
				if(item.status){
					ctx.strokeRect((item.x+1)*seatWidth,200+(item.y)*60,seatWidth-4,seatWidth-4);
					ctx.globalCompositeOperation="source-over";
					ctx.fillStyle = "white";
					ctx.fillRect((item.x+1)*seatWidth+5,195+(item.y)*60,seatWidth-14,seatWidth-4);
					ctx.save();
					ctx.strokeStyle="gray";
					ctx.strokeRect((item.x+1)*seatWidth+5,195+(item.y)*60,seatWidth-14,seatWidth-4);
					ctx.restore()
				}else{
					ctx.fillStyle = "red";
					ctx.fillRect((item.x+1)*seatWidth,200+(item.y)*60,seatWidth-4,seatWidth-4);
					ctx.globalCompositeOperation="source-over";
					ctx.fillRect((item.x+1)*seatWidth+5,195+(item.y)*60,seatWidth-14,seatWidth-4);
					this.seated[`${item.x}-${item.y}`] = 1
				}
				
			})
		})
		let height = document.body.clientHeight;
		this.setState({
			height:(height-128)*2
		})
		
	}
	render(){
		
		return (
			<div className="online-ticket">
				<header>
					<p className="movie-name">天气预报</p>
					<p className="online-info">今天 12-21 11:40~13:26 (国语 2D)</p>
					<p className="ticket-info">
						<span className="left-seat">可选</span>
						<span className="have-seated">已售</span>
						<span className="best-seat">最佳观影区</span>
					</p>
				</header>
				<div className="hall-name">
					银幕
				</div>
				<canvas className="canvas" ref="canvas" onTouchEnd={this.touchEnd} width={document.body.clientWidth*2} height={this.state.height}>

				</canvas>
			</div>
		)
	}
}