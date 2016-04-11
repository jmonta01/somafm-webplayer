angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/data/channels.json'},pls:{url:'/data/[STATION_ID][QUALITY].pls',stationKey:'[STATION_ID]',qualityKey:'[QUALITY]'},playList:{url:'/data/songs/[STATION_ID].json',key:'[STATION_ID]'},streams:{urls:{primary:'http://ice1.somafm.com/[STATION_ID]-[QUALITY]-[TYPE]',alternate:'http://ice2.somafm.com/[STATION_ID]-[QUALITY]-[TYPE]'},stationKey:'[STATION_ID]',qualityKey:'[QUALITY]',typeKey:'[TYPE]'},community:{sections:[{key:'news',active:true,config:{dataUrl:'/data/news.xml'}},{key:'twitter',active:false},{key:'flickr',active:false},{key:'facebook',active:false}]}})

;