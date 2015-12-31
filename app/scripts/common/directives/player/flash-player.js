'use strict';

angular.module('somafmPlayerApp')
  .directive("sfFlashPlayer", [
    function () {
      return {
        restrict :"E",
        replace: true,
        scope: {
        },
        templateUrl: 'common/player/flash-player.tpl.html',
        link: function (scope, element, attr) {

          var swfVersionStr = "10.2.0";
          var xiSwfUrlStr = "flash/playerProductInstall.swf";

          var flashvars = {
            streams: PlayerService.station() ? PlayerService.station().urls : []
          };

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
    }
  ]);
