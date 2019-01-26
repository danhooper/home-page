package com.danhooper.homepage.controller;

import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@RestController
public class RssController {
    @RequestMapping("/rss")
    public List<RssFeed> getFeeds() {
        ArrayList<RssFeed> feeds = new ArrayList<>();
        try {
            feeds.add(new RssFeed("ArsTechnica", new URL("http://feeds.arstechnica.com/arstechnica/index?format=xml")));
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return feeds;
    }
}
