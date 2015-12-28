angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/data/channels.xml'},pls:{url:'/data/[STATION_ID].pls',key:'[STATION_ID]'},playList:{url:'/data/[STATION_ID].xml',key:'[STATION_ID]'},community:{sections:['news','twitter','flickr','facebook']},news:{url:'/data/news.xml'}})

;