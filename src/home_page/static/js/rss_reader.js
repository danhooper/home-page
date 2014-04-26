var RssReader = {
    init: function () {
        $(document).on('click', '.feed-expand', RssReader.feedExpand);
        $(document).on('click', '.feed-refresh', RssReader.refreshFeed);
    },
    feedExpand: function(event) {
        event.preventDefault();
        target_a = event.target;
        if ($(event.target).is('span')) {
            target_a = $(event.target).parent();
        }
        entry_wrapper = $(target_a).nextAll('.entry_wrapper').slice(0, 1);
        if (entry_wrapper.hasClass('hidden')) {
            console.log('Showing');
            $(entry_wrapper).css('display', 'block');
            $(entry_wrapper).addClass('visible');
            $(entry_wrapper).removeClass('hidden');
            $(target_a).children('.glyphicon-plus').addClass('glyphicon-minus');
            $(target_a).children('.glyphicon-plus').removeClass('glyphicon-plus');
        } else {
            console.log('Hiding');
            $(entry_wrapper).css('display', 'none');
            $(entry_wrapper).addClass('hidden');
            $(entry_wrapper).removeClass('visible');
            $(target_a).children('.glyphicon-minus').addClass('glyphicon-plus');
            $(target_a).children('.glyphicon-minus').removeClass('glyphicon-minus');
        }
    },
    refreshFeed: function(event) {
        event.preventDefault();
        feed = $(event.target).parents('.feed');
        url = feed.data('url');
        feed.load(url);
    }
};
