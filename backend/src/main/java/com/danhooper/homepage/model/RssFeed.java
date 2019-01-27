package com.danhooper.homepage.model;

import java.net.URL;

public class RssFeed {
    private int id;
    private String title;
    private URL feedUrl;
    private URL websiteUrl;

    public RssFeed() {
    }

    public RssFeed(int id, String title, URL feedUrl, URL websiteUrl) {
        this.id = id;
        this.title = title;
        this.feedUrl = feedUrl;
        this.websiteUrl = websiteUrl;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public URL getFeedUrl() {
        return feedUrl;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setFeedUrl(URL feedUrl) {
        this.feedUrl = feedUrl;
    }

    public URL getWebsiteUrl() {
        return this.websiteUrl;
    }

    public void setWebsiteUrl(URL websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}
