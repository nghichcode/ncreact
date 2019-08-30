import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import RecentsDiv from './RecentsDiv';
import db from './database/database';
import {GetCategory, DiffRand, EnDate} from './database/dbutils';

var IMG_PATH = [
  'slider-1-1200x900.jpg',
  'recent-news-1-600x450.jpg',
  'slider-2-450x600.jpg',
  'slider-3-450x600.jpg',
  'crypto-news-1-600x450.jpg',
  'crypto-news-2-600x450.jpg',
  'crypto-news-4-600x450.jpg',
  'crypto-news-5-600x450.jpg',
  'crypto-news-6-600x450.jpg',
  'adult.jpg',
  'default-thumb-1.jpg',
  'default-thumb-2.jpg',
  'default-thumb-3.jpg'
  ];


var posts = GetCategory(db,'posts');
var df = new DiffRand(0,posts.length);
var rdt = [];
for (var i = 0; i < 2; i++) {
	var id=df.next();
	rdt[i]={link : posts[id][4]+'/'+posts[id][5], title : posts[id][0], date : EnDate(posts[id][2])}
};
console.log(rdt);

ReactDOM.render(
	<div>
		{rdt.map(({link, title, date},id)=><RecentsDiv key={'min-'+id} link={link} title={title} date={date} />)}
	</div>
	, document.getElementById('recents-div'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
