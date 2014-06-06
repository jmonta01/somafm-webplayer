'use strict';

angular.module('somafmPlayerApp')
    .directive("viewstack", ["$window", "$timeout", "$rootScope",
        function ($window, $timeout, $rootScope) {
            return {
                restrict :"E",
                replace: true,
                scope: {},
                template:   "<div id='viewstack' class='viewstack container'' ng-view='' ></div>",
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
                    /*
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

                    angular.element(element.parent()).on("onload", function () {
                        console.log("list parent onload");
                    });

                    $timeout(function () {
                        scope.updateLayout();
                    }, 300);
                    */
                }
            }
        }
    ])
    .directive("audioplayer", [ "$rootScope",
        function ($rootScope) {
            return {
                restrict: "E",
                replace: true,
                require: "",
                scope : {
                    station: "="
                },
                template:   "<div class='player-container'>" +
                                "<div class='player'>" +
                                    "<button class='btn btn-link btn-lg' ng-show='!playing' ng-click='togglePlay()'><span class='glyphicon glyphicon-play'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='playing' ng-click='togglePlay()'><span class='glyphicon glyphicon-pause'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='!isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-down'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-off'></span></button>" +
                                    "<volumebar value='volume' min='0' max='1' value-change='updateVolume(val)'></volumebar>" +
                                    "<button class='btn btn-link btn-lg' ng-click='maxVolume()'><span class='glyphicon glyphicon-volume-up'></span></button>" +
                                "</div>" +
                            "</div>",
                link: function (scope, element, attr) {

                    scope.audio = new Audio();

                    scope.playing = false;

                    scope.volume = scope.audio.volume;

                    scope.$watch("station", function (val) {

                        scope.audio.pause();
                        angular.element(scope.audio).html("");

                        if (val) {
                            angular.forEach(val.urls, function (url) {
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


                    });

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
                        scope.audio.muted = !scope.audio.muted;
                        scope.volume = scope.audio.muted ? 0 : scope.audio.volume;
                    };

                    scope.isMuted = function () {
                        return scope.audio.muted;
                    };

                    angular.element(scope.audio).on("loadedmetadata", function (event) {
                        console.log(event);
                    })
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
            template:   "<div class='slider'>" +
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
                    if (!width) {
                        width = angular.element(element).width();
                    }
                    if (!offset) {
                        offset = angular.element(element).offset().left;
                    }
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
                        scrubber.width( "100%");
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
    }]);