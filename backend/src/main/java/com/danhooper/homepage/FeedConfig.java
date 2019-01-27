package com.danhooper.homepage;

import com.danhooper.homepage.model.RssFeed;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix="feed")
public class FeedConfig {
    private String foo;
    private List<RssFeed> feeds = new ArrayList<>();

    public List<RssFeed> getFeeds() {
        return this.feeds;
    }

    public void setFeeds(List<RssFeed> feeds) {
        this.feeds = feeds;
    }

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }

    @Override
    public String toString() {
        return foo;
    }
}
