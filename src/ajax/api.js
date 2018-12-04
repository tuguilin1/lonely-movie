import axios from "axios"


//获取首页文章
export const getIndexAticle = function(){
	let url = "http://127.0.0.1:3001/article";
	return new Promise((res,rej)=>{
		axios.get(url).then((data)=>{
			res(data)
		})
	})
}


export const getNowMovie = function(){
	let url = "http://127.0.0.1:3001/nowmovie";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290
			}
		}).then((data)=>{
			res(data)
		})
	})
}

