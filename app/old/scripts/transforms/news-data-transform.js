'use strict';

angular.module('somafmPlayerApp')
  .factory("NewsTransform", [
    function () {
      return function (data) {
        var x2js = new X2JS();
        var xmlDoc = x2js.parseXmlString(data);
        var json = x2js.xml2json( xmlDoc );

        var news = json.news;
        news.banner = news.banner.__cdata;

        var newsItems = [];
        angular.forEach(news.items.item, function (item) {
          var date = new Date();
          date.setTime(parseInt(item.date) * 1000);
          newsItems.push({
            content: item.content.__cdata,
            date: date
          });
        });
        news.items = newsItems;

        return news;
      }
    }
  ]);
