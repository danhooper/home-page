package com.danhooper.homepage.model;

import java.net.URL;

public class RssFeed {
    private final String title;
    private final URL url;

    public RssFeed(String title, URL url) {
        this.title = title;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public URL getUrl() {
        return url;
    }
}
