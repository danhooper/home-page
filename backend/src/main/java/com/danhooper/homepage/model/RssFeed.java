package com.danhooper.homepage.model;

import java.net.URL;

public class RssFeed {
    private int id;
    private String title;
    private URL url;

    public RssFeed() {
    }

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

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(URL url) {
        this.url = url;
    }
}
