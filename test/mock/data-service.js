'use strict';

angular.module('mockData', [])
    .value('channelsJSON',
        [
            {
                "title":"Groove Salad",
                "description":"A nicely chilled plate of ambient/downtempo beats and grooves.",
                "dj":"Rusty Hodge",
                "djmail":"rusty@somafm.com",
                "genre":"ambient|electronica",
                "image":"http://somafm.com/img/groovesalad120.png",
                "largeimage":"http://somafm.com/logos/256/groovesalad256.png",
                "xlimage":"http://somafm.com/logos/512/groovesalad512.png",
                "twitter":"groovesalad",
                "updated":"1396147984",
                "fastpls":"http://somafm.com/groovesalad.pls,http://somafm.com/groovesalad64.pls",
                "slowpls":"http://somafm.com/groovesalad56.pls,http://somafm.com/groovesalad32.pls",
                "highestpls":"http://somafm.com/groovesalad130.pls",
                "listeners":"1836",
                "lastPlaying":"United Future Organization - The Sixth Sense",
                "_id":"groovesalad"
            },
            {
                "title":"Secret Agent",
                "description":"The soundtrack for your stylish, mysterious, dangerous life. For Spies and PIs too!",
                "dj":"Rusty Hodge",
                "djmail":"rusty@somafm.com",
                "genre":"lounge",
                "image":"http://somafm.com/img/secretagent120.jpg",
                "largeimage":"http://somafm.com/logos/256/secretagent256.png",
                "xlimage":"http://somafm.com/logos/512/secretagent512.png",
                "twitter":"secretagentsoma",
                "updated":"1396147984",
                "fastpls":"http://somafm.com/secretagent.pls,http://somafm.com/secretagent64.pls",
                "slowpls":"http://somafm.com/secretagent24.pls,http://somafm.com/secretagent32.pls",
                "highestpls":"http://somafm.com/secretagent130.pls",
                "listeners":"5000",
                "lastPlaying":"Batidos - Esta Osquiridad",
                "_id":"secretagent"
            }
        ]
    )
    .value('channelJSON',
            {
                "title":"Groove Salad",
                "description":"A nicely chilled plate of ambient/downtempo beats and grooves.",
                "dj":"Rusty Hodge",
                "djmail":"rusty@somafm.com",
                "genre":"ambient|electronica",
                "image":"http://somafm.com/img/groovesalad120.png",
                "largeimage":"http://somafm.com/logos/256/groovesalad256.png",
                "xlimage":"http://somafm.com/logos/512/groovesalad512.png",
                "twitter":"groovesalad",
                "updated":"1396147984",
                "fastpls":"http://somafm.com/groovesalad.pls,http://somafm.com/groovesalad64.pls",
                "slowpls":"http://somafm.com/groovesalad56.pls,http://somafm.com/groovesalad32.pls",
                "highestpls":"http://somafm.com/groovesalad130.pls",
                "listeners":"1836",
                "lastPlaying":"United Future Organization - The Sixth Sense",
                "_id":"groovesalad"
            }
    )
    .value('plsJSON',
        [
            "http://uwstream1.somafm.com:80",
            "http://xstream1.somafm.com:8032",
            "http://uwstream2.somafm.com:8032",
            "http://ice.somafm.com/groovesalad"
        ]
    )
    .value('stationPlayListJSON',
        [
            {
                "album": "Wallpaper* mach 1.5",
                "albumart": "",
                "artist": "United Future Organization",
                "date":  "1398397331",
                "title": "The Sixth Sense"
            },
            {
                "album": "Chill Out Lounge Volume 3",
                "albumart": "",
                "artist": "Org Lounge",
                "date":  "1398397033",
                "title": "Mirror"
            }
        ]
    );