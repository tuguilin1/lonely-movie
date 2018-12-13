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

export const getFutrueMovie = function(){
	let url = "http://127.0.0.1:3001/futruemovie";
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

export const getMovie = function(movieId){
	let url = "http://127.0.0.1:3001/movie";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290,
				movieId
			}
		}).then((data)=>{
			res(data)
		})
	})
}

export const getComments = function(movieId){
	let url = "http://127.0.0.1:3001/comments";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290,
				movieId
			}
		}).then((data)=>{
			res(data)
		})
	})
}

export const getLongComments = function(movieId){
	let url = "http://127.0.0.1:3001/longcomments";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290,
				movieId
			}
		}).then((data)=>{
			res(data)
		})
	})
}

export const getPhotos = function(movieId){
	let url = "http://127.0.0.1:3001/photos";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290,
				movieId
			}
		}).then((data)=>{
			res(data)
		})
	})
}

export const getMovieDetail = function(movieId){
	return new Promise((res,rej)=>{
		Promise.all([getMovie(movieId),getComments(movieId),getPhotos(movieId),getLongComments(movieId)]).then((data)=>{
			res(data)
		})
	})
}

export const getCinemas = function(){
	let url = "http://127.0.0.1:3001/cinema";
	return new Promise((res,rej)=>{
		axios.get(url,{
			params:{
				locationId:290,
			}
		}).then((data)=>{
			res(data)
		})
	})
}

