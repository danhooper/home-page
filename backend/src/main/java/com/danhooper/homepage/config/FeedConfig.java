package com.danhooper.homepage.config;

import com.danhooper.homepage.model.RssFeed;
import com.danhooper.homepage.model.RssFeedDto;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Configuration
@ConfigurationProperties(prefix="feed")
public class FeedConfig {
    private List<RssFeed> feeds = new ArrayList<>();

    public List<RssFeed> getFeeds() {
        return this.feeds;
    }

    public List<RssFeedDto> getFeedsDto() {
        return this.feeds.stream()
            .map(feed -> new RssFeedDto(feed.getId(), feed.getTitle(), feed.getWebsiteUrl()))
            .collect(Collectors.toList());
    }

    public void setFeeds(List<RssFeed> feeds) {
        this.feeds = feeds;
    }
}
