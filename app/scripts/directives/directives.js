'use strict';

angular.module('somafmPlayerApp')
    .directive("viewstack", ["$window", "$timeout", "$rootScope",
        function ($window, $timeout, $rootScope) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template:   "<div id='viewstack' class='viewstack container'' ui-view onload='updateLayout()'></div>",
                link: function (scope, element, attr) {

                    scope.updateLayout = function () {
                        var view = angular.element(document.getElementById("viewstack"));

                        var winHeight = $window.innerHeight;
                        var footerHeight = document.getElementById("footer").clientHeight;
                        var newHeight = winHeight - footerHeight - 10;

                        view.css("height", newHeight + "px");
                        $rootScope.viewStackHeight = newHeight;
                    };

                    angular.element($window).bind( "resize", function () {
                        scope.updateLayout();
                    });

                    $timeout(function () {
                        scope.updateLayout();
                    }, 300);

                }
            }
        }
    ])
    .directive("list", ["$window", "$timeout", "$rootScope",
        function ($window, $timeout, $rootScope) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                transclude: true,
                template:   "<div id='list' class='list' ng-transclude></div>",
                link: function (scope, element, attr) {

                    scope.updateLayout = function () {

                        var children = element.parent().children();
                        var list = angular.element(document.getElementById("list"));
                        var availHeight = $rootScope.viewStackHeight;

                        for (var i=0; i<children.length; i++) {
                            var child = angular.element(children[i]);
                            if (child.attr("id") != "list") {
                                var mTop = Number(child.css("margin-top").replace("px", "")) || 0;
                                var mBtm = Number(child.css("margin-bottom").replace("px", "")) || 0;

                                var childHeight = parseInt(children[i].clientHeight);
                                availHeight -= (childHeight + mTop + mBtm);
                            }
                        }
                        list.css("height", availHeight + "px");
                    };

                    angular.element($window).bind( "resize", function () {
                        scope.updateLayout();
                    });

                    $timeout(function () {
                        scope.updateLayout();
                    }, 300);

                }
            }
        }
    ])
    .directive("audioplayer", [ "USE_HTML_AUDIO",
        function (USE_HTML_AUDIO) {
            return {
                restrict: "E",
                replace: true,
                require: "",
                scope : {
                    station: "="
                },
                template: function() {
                    var tmp;
                    tmp = "<div class='control-bar'>";

                    if (USE_HTML_AUDIO) {
                        tmp += "<htmlplayer station='station' ></htmlplayer>";
                    } else {
                        tmp += "<flashplayer width='570' height='54' ></flashplayer>";
                    }
                    tmp += "</div>";

                    return tmp;
                }
            }
        }
    ])
    .directive("htmlplayer", ["$rootScope", '$window', '$timeout',
        function ($rootScope, $window, $timeout) {
            return {
                restrict : "E",
                replace : true,
                scope : {
                    station: "="
                },
                template:
                    "<div class='player'>" +
                        "<audio id='audioPlayer' autoplay='true' preload='none'></audio>" +
                        "<button id='playBtn' class='btn btn-link btn-lg' ng-show='!playing' ng-disabled='!station' ng-click='togglePlay()'><span class='glyphicon glyphicon-play'></span></button>" +
                        "<button id='pauseBtn' class='btn btn-link btn-lg' ng-show='playing' ng-disabled='!station' ng-click='togglePlay()'><span class='glyphicon glyphicon-pause'></span></button>" +
                        "<button id='unmuteBtn' class='btn btn-link btn-lg' ng-show='!isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-down'></span></button>" +
                        "<button id='muteBtn' class='btn btn-link btn-lg' ng-show='isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-off'></span></button>" +
                        "<volumebar id='volumeslider' value='volume' min='0' max='1' value-change='updateVolume(val)'></volumebar>" +
                        "<button id='maxvolBtn' class='btn btn-link btn-lg' ng-click='maxVolume()'><span class='glyphicon glyphicon-volume-up'></span></button>" +
                    "</div>",
                link: function (scope, element, attr) {
                    scope.muted = false;
                    scope.playing = false;

                    scope.audio = document.getElementById("audioPlayer");
                    scope.volume = scope.audio.volume;

                    scope.$watch("station", function (val) {
                        scope.audio.pause();
                        angular.element(scope.audio).html("");

                        if (val) {
                            angular.forEach(val.urls.reverse(), function (url) {
                                var source = document.createElement('source');
                                if (scope.audio.canPlayType('audio/mpeg;')) {
                                    source.type = 'audio/mpeg';
                                    source.src = url;
                                } else {
                                    source.type = 'audio/ogg';
                                    source.src = url;
                                }
                                scope.audio.appendChild(source);
                            });

                            scope.audio.load();
                            scope.audio.play();
                            scope.playing = true;
                        } else {
                            scope.audio.load();
                            scope.playing = false;
                        }

                        $timeout(function () {
                            window.dispatchEvent(new Event('resize'));
                        }, 50)

                    });

                    angular.element($window).bind( "resize", function () {
                        scope.updateLayout();
                    });

                    scope.updateLayout = function () {
                        var totalWidth = parseInt(element.css('width').replace('px', ''));

                        if (!scope.playing) {
                            totalWidth -= parseInt(angular.element(document.getElementById('playBtn')).css('width').replace('px', ''));
                        }   else {
                            totalWidth -= parseInt(angular.element(document.getElementById('pauseBtn')).css('width').replace('px', ''));
                        }

                        if (!scope.isMuted()) {
                            totalWidth -= parseInt(angular.element(document.getElementById('unmuteBtn')).css('width').replace('px', ''));
                        }   else {
                            totalWidth -= parseInt(angular.element(document.getElementById('muteBtn')).css('width').replace('px', ''));
                        }

                        totalWidth -= parseInt(angular.element(document.getElementById('maxvolBtn')).css('width').replace('px', ''));
                        totalWidth -= 30;

                        angular.element(document.getElementById('volumeslider')).css('width', Math.min(totalWidth, 200) + 'px');
                    };

                    scope.togglePlay = function () {
                        if (scope.playing) {
                            scope.audio.pause();
                            scope.playing = false;
                        } else {
                            scope.audio.play();
                            scope.playing = true;
                        }
                    };

                    scope.volumeDown = function () {
                        if (scope.audio.volume > 0) {
                            scope.audio.volume -= .1;
                        }
                        scope.volume = scope.audio.volume;
                    };

                    scope.volumeUp = function () {
                        if (scope.audio.volume < 1) {
                            scope.audio.volume += .1;
                        }
                        scope.volume = scope.audio.volume;
                    };

                    scope.maxVolume = function () {
                        if (scope.audio.muted) {
                            scope.audio.muted = false;
                        }
                        scope.audio.volume = 1;
                        scope.volume = scope.audio.volume;
                    };

                    scope.updateVolume = function (val) {
                        scope.audio.volume = val;
                    };

                    scope.toggleMute = function () {
                        scope.muted = !scope.muted;
                        scope.audio.muted = scope.muted;
                        scope.volume = scope.muted ? 0 : scope.audio.volume;
                    };

                    scope.isMuted = function () {
                        return scope.audio.muted;
                    };

                    scope.updateLayout();
                }
            }
        }
    ])
    .directive("volumebar", [function () {
        return {
            restrict :"E",
            replace: true,
            scope: {
                value: "=",
                valueChange: "&"
            },
            template:
                "<div class='slider'>" +
                    "<div class='slider-track'>" +
                        "<div id='sliderValue' class='slider-value'></div>" +
                    "</div>" +
                "</div>",
            link: function (scope, element, attr) {
                var width,
                    offset,
                    scrubber = angular.element(document.getElementById('sliderValue')),
                    dragging = false;

                scope.$watch('value', function (val) {
                    scrubber.css("width", val / attr.max * 100 + "%");
                });

                element.on('mousedown', function (event) {
                    dragging = true;
                    width =  element[0].getBoundingClientRect().width;
                    offset = element[0].getBoundingClientRect().left;
                });

                element.on('mouseup', function (event) {
                    dragging = false;
                    _calcScrubberWidth(event.pageX);
                });

                element.on('mousemove', function (event) {
                    if (dragging) {
                        _calcScrubberWidth(event.pageX);
                    }
                });

                function _calcScrubberWidth (x) {
                    var dif = x - offset;

                    if (dif < 0) {
                        dif = attr.min;
                        scrubber.css("width", "0%");
                        scope.value = attr.min;
                    }
                    else if (dif > width) {
                        dif = attr.max;
                        scrubber.css("width", "100%");
                        scope.value = attr.max;
                    }
                    else {
                        var per = dif / width;
                        scrubber.css("width", per * 100 + "%");
                        scope.value = per * attr.max;
                    }

                    scope.valueChange({val: scope.value});

                    scope.$apply();
                }
            }

        }
    }])
    .directive("flashplayer", ['PlayerService', function (PlayerService) {
        return {
            restrict : "E",
            replace: true,
            scope: {
                width: "@",
                height: "@"
            },
            template :
                "<div id='flashplayer'></div>",
            link: function (scope, element, attr) {

                var swfVersionStr = "10.2.0";
                var xiSwfUrlStr = "flash/playerProductInstall.swf";


                var flashvars = {
                    streams: PlayerService.station() ? PlayerService.station().urls : []
                };

                console.log(PlayerService.station().urls);

                var params = {
                    quality: "high",
                    wmode: "transparent",
                    allowscriptaccess: "sameDomain"
                };
                var attributes = {
                    id: "flashplayer",
                    name: "flashplayer",
                    align: "middle"
                };

                var el = document.getElementById("flashplayer");
                swfobject.embedSWF(
                    "flash/Player.swf", el,
                    scope.width, scope.height,
                    swfVersionStr, xiSwfUrlStr,
                    flashvars, params, attributes);

                swfobject.createCSS("#flashContent", "display:block;text-align:left;");
            }
        }
    }])
    .directive("news", ['CommunityService',
        function (CommunityService) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template: "<div class='community news'></div>",
                link: function (scope, element, attr) {
                    //source http://somafm.com/app/news.html
                    CommunityService.loadNews().then(
                        function (response) {
                            var regEx = new RegExp('<body[^>]*>((.|[\n\r])*)<\/body>', 'g');
                            var matches = response.match(regEx);
                            var content = matches[0];
                            content = content.replace('<body>', '').replace('</body>', '');
                            element.append(content);
                        }
                    )
                }
            }
        }
    ])
    .directive("twitter", ['CommunityService',
        function (CommunityService) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template: "<div class='community facebook'></div>",
                link: function (scope, element, attr) {
                    //append the iframe until we can get the full api integrated
                    element.append("<iframe src='http://somafm.com/app/twitter.html'></iframe>");

                    //source  http://somafm.com/app/twitter.html
                    /*
                     CommunityService.loadTwitter().then(
                         function (response) {

                         }
                     );
                     */
                }
            }
        }
    ])
    .directive("flickr", ["$rootScope", 'CommunityService',
        function ($rootScope, CommunityService) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template: function () {
                    return  "<div class='community flickr'>" +
                                "<h1>Here are SomaFM listeners from around the world. Send us your pictures with your SomaFM gear to <a href='mailto:dj@somafm.com'>dj@somafm.com</a> and we'll post them on Flickr.</h1>" +
                                "<div id='imagediv'></div>" +
                                "<h1>More on Flickr at <a href='http://flickr.com/SomaFM' target='_blank'> www.flickr.com/SomaFM </a></h1>" +
                            "</div>";
                },
                link: function (scope, element, attr) {
                    var loaded = false;

                    if (loaded) {
                        //if loaded return, so we don't reload the flickr stream every time
                        return;
                    }

                    CommunityService.loadFlickr().then(
                        function (data) {
                            // Start putting together the HTML string
                            var htmlString = "";
                            angular.forEach(data.items, function (item) {
                                // want the big ones
                                var imgSrc = (item.media.m).replace("_m.jpg", ".jpg");
                                htmlString +=   "<div class='thumbnail with-caption'>" +
                                                    "<img src='" + imgSrc + "' class='img-responsive img-rounded' />" +
                                                    "<h2>" + item.title + "</h2>" +
                                                "</div>";
                            });

                            // Pop our HTML in the #images DIV
                            $('#imagediv').html(htmlString);
                            loaded = true;
                        }
                    );
                }
            }
        }
    ])
    .directive("facebook", ["$rootScope", 'CommunityService',
        function ($rootScope, CommunityService) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template: "<div class='community facebook'></div>",
                link: function (scope, element, attr) {
                    //append the iframe until we can get the full api integrated
                    element.append("<iframe src='http://somafm.com/app/facebook.html'></iframe>");

                    //source  http://somafm.com/app/facebook.html
                    /*
                    CommunityService.loadFacebook().then(
                        function (response) {

                        }
                    );
                    */
                }
            }
        }
    ]);