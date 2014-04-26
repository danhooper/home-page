var HomePage = {
    init: function () {
        $('#rss_feeds').load('rss_reader/', HomePage.loadRSSFeeds);
        $('#website_health').load('website_health/', function() {
            $('.website').each(function () {
                $(this).load($(this).data('url'));
            })
        });
    },
    reloadRSS: function() {
        HomePage.loadRSSFeeds();
    },
    loadRSSFeeds: function() {
        $('.feed').each(function () {
            $('.feed').empty();
            $(this).load($(this).data('url'));
        });
        setTimeout(function() {
            HomePage.reloadRSS();
        }, 60000 * 10); // 10 minutes
    }
};
