angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/data/channels.json'},pls:{url:'/data/[STATION_ID].pls',key:'[STATION_ID]'},playList:{url:'/data/songs/[STATION_ID].json',key:'[STATION_ID]'},community:{sections:[{key:'news',active:true,config:{dataUrl:'/data/news.xml'}},{key:'twitter',active:false},{key:'flickr',active:false},{key:'facebook',active:false}]}})

;