'use strict';

angular.module('somafmPlayerApp')
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
  ]);
