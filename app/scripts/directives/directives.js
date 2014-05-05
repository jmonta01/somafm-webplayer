'use strict';

angular.module('somafmPlayerApp')
    .directive("viewstack", ["$window", "$timeout", "$rootScope",
        function ($window, $timeout, $rootScope) {
            return {
                restrict :"E",
                replace: true,
                scope: {
                    volume: "=",
                    change: "@"
                },
                template:   "<div id='viewstack' class='viewstack container'' ng-view='' onload='updateLayout()'></div>",
                link: function (scope, element, attr) {

                    scope.updateLayout = function () {
                        var footer = angular.element(document.getElementById("footer"));
                        var view = angular.element(document.getElementById("viewstack"));
                        view.height(angular.element($window).height() - footer.height()) ;
                        $rootScope.viewStackHeight = view.height();
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
                                availHeight -= (child.height() + mTop + mBtm);
                            }
                        }

                        list.height(availHeight);
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

                }
            }
        }
    ])
    .directive("datagrid", ["$window", "$timeout", "$rootScope",
        function ($window, $timeout, $rootScope) {
            return {
                restrict :"A",
                replace: true,
                scope: {},
                transclude: true,
                template:   "<div id='list' class='list' ng-transclude></div>",
                link: function (scope, element, attr) {

                    scope.updateLayout = function () {

                        var header = angular.element(document.getElementById("header"));
                        var table = angular.element(element);
                        table.height(angular.element(element.parent()).height() - header.height()) ;
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
    .directive("audioplayer", [ "$rootScope",
        function ($rootScope) {
            return {
                restrict: "E",
                replace: true,
                require: "",
                scope : {
                    station: "="
                },
                template:   "<div class='player-container' ng-show='$root.selectedStation'>" +
                                "<div class='player'>" +
                                    "<button class='btn btn-link btn-lg' ng-show='!playing' ng-click='togglePlay()'><span class='glyphicon glyphicon-play'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='playing' ng-click='togglePlay()'><span class='glyphicon glyphicon-pause'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='!isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-down'></span></button>" +
                                    "<button class='btn btn-link btn-lg' ng-show='isMuted()' ng-click='toggleMute()'><span class='glyphicon glyphicon-volume-off'></span></button>" +
                                    //"<volumebar volumne='audio.volume' change='updateVolume()'></volumebar>" +
                                    "<button class='btn btn-link btn-lg' ng-click='maxVolume()'><span class='glyphicon glyphicon-volume-up'></span></button>" +
                                "</div>" +
                            "</div>",
                link: function (scope, element, attr) {

                    scope.audio = new Audio();

                    scope.playing = false;

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
                    };

                    scope.volumeUp = function () {
                        if (scope.audio.volume < 1) {
                            scope.audio.volume += .1;
                        }
                    };

                    scope.maxVolume = function () {
                        scope.audio.volume = 1;
                    };

                    scope.toggleMute = function () {
                        scope.audio.muted = !scope.audio.muted;
                    };

                    scope.isMuted = function () {
                        return scope.audio.muted;
                    }

                }
            }
        }
    ])
    .directive("volumebar", [function () {
        return {
            restrict :"E",
            replace: true,
            scope: {
                volume: "=",
                change: "@"
            },
            template:   "<div class='slider'>" +
                            "<div class='slider-track'>" +
                                "<div class='slider-value'></div>" +
                            "</div>" +
                        "</div>",
            link: function (scope, element, attr) {

            }

        }
    }]);