import React from 'react';
import Onshow from "../onshow";
import Search from "../search"
import Article from "../article"
export default function indexPage(){
	return (
		<div>
			<Search/>
			<Onshow/>
			<Article/>
		</div>
	)
}