package com.danhooper.homepage;

import com.danhooper.homepage.model.RssFeed;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix="feed")
public class FeedConfig {
    private List<RssFeed> feeds = new ArrayList<>();

    public List<RssFeed> getFeeds() {
        return this.feeds;
    }

    public void setFeeds(List<RssFeed> feeds) {
        this.feeds = feeds;
    }
}
