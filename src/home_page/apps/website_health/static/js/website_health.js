var WebsiteHealth = {
    init: function() {
        $(document).on('click', '.result-expand',
        		WebsiteHealth.resultExpand);
        $(document).on('click', '.website-refresh', WebsiteHealth.refreshWebsite);
    },
    healthCheck: function() {
        var numGood = 0;
        var numBad = 0;
        $('.website_health_link').each(function(index, elem) {
            postData = {link_url: $(this).data('link-url')};
            $.post('website_health/website/health/', postData, function(data) {
                try{
                    if ( data['health']) {
                        numGood += 1
                        $(elem).appendTo('#website_good_pages');
                    } else {
                        $(elem).appendTo('#website_bad_pages');
                        numBad += 1;
                    }
                } catch(err) {
                    console.log('[.website_health_link] ' + err)
                    numBad += 1;
                }
                $('#website_health_report').html('Good ' + numGood + '<br/>Bad: ' + numBad)
            })
        })
    },
    resultExpand: function() {
        event.preventDefault();
        target_a = event.target;
        if ($(event.target).is('span')) {
            target_a = $(event.target).parent();
        }
        resultDiv = $(target_a).nextAll('.result').slice(0,1);
        if( resultDiv.hasClass('hidden')) {
            $(resultDiv).css('display', 'block');
            $(resultDiv).addClass('visible');
            $(resultDiv).removeClass('hidden');
            $(target_a).children('.glyphicon-plus').addClass('glyphicon-minus');
            $(target_a).children('.glyphicon-plus').removeClass('glyphicon-plus');
        } else {
            $(resultDiv).css('display', 'none');
            $(resultDiv).addClass('hidden');
            $(resultDiv).removeClass('visible');
            $(target_a).children('.glyphicon-minus').addClass('glyphicon-plus');
            $(target_a).children('.glyphicon-minus').removeClass('glyphicon-minus');
        }

    },
    refreshWebsite: function(event) {
        event.preventDefault();
        website = $(event.target).parents('.website');
        url = website.data('url');
        website.load(url);
    }
};
