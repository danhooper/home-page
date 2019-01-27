package com.danhooper.homepage.service;

import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


public class RssArticleFetcher {
    public List<RssArticle> getArticles(RssFeed rssFeed) {
        SyndFeedInput input = new SyndFeedInput();
        try {
            SyndFeed feed = input.build(new XmlReader(rssFeed.getFeedUrl()));
            return feed.getEntries().stream().map(syndEntry -> {
                return new RssArticle(syndEntry.getTitle(), syndEntry.getDescription().getValue());
            }).collect(Collectors.toList());
        } catch (FeedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
