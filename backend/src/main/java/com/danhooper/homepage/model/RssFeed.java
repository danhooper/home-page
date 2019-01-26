package com.danhooper.homepage.model;

import java.net.URL;

public class RssFeed {
    private final int id;
    private final String title;
    private final URL url;

    public RssFeed(int id, String title, URL url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public URL getUrl() {
        return url;
    }
}
