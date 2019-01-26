package com.danhooper.homepage.controller;

import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import com.danhooper.homepage.service.RssArticleFetcher;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@RestController
public class RssArticleController {
    @RequestMapping("/rss/{id}/article")
    public List<RssArticle> getArticles(@PathVariable("id") String id) {
        RssArticleFetcher fetcher = new RssArticleFetcher();
        try {
            return fetcher.getArticles(new RssFeed(0, "ArsTechnica", new URL("http://feeds.arstechnica.com/arstechnica/index?format=xml")));
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
