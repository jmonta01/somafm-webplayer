angular.module('config', [])

.constant('AppURLs', {allStations:{url:'/data/channels.json'},playList:{url:'/data/songs/[STATION_ID].json',key:'[STATION_ID]'},community:{sections:[{key:'news',active:true},{key:'twitter',active:true},{key:'flickr',active:true},{key:'facebook',active:false}]}})

;