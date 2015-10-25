angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/channels.xml'},pls:{url:'/[STATION_ID].pls?popup',key:'[STATION_ID]'},playList:{url:'/songs/[STATION_ID].xml',key:'[STATION_ID]'},community:{sections:['news','flickr']},news:{url:'/news.xml'}})

;