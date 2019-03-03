package com.danhooper.homepage.controller;

import com.danhooper.homepage.config.FeedConfig;
import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import com.danhooper.homepage.service.RssArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class RssArticleController {
    @Autowired
    FeedConfig feedConfig;

    @Autowired
    RssArticleService rssArticleService;

    @RequestMapping("/rss/{id}/article")
    public List<RssArticle> getArticles(@PathVariable("id") int id) {
        Optional<RssFeed> feedOptional = feedConfig.getFeeds().stream().filter(feed -> feed.getId() == id).findFirst();
        return feedOptional.isPresent() ? rssArticleService.getArticles(feedOptional.get()) : null;
    }
}
