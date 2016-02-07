angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/data/channels.xml'},pls:{url:'/data/[STATION_ID].pls',key:'[STATION_ID]'},playList:{url:'/data/[STATION_ID].xml',key:'[STATION_ID]'},community:{sections:[{key:'news',active:true,config:{dataUrl:'/data/news.xml'}},{key:'twitter',active:false},{key:'flickr',active:false},{key:'facebook',active:false}]}})

;