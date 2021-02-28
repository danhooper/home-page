package com.danhooper.homepage.model;

import java.net.URL;

public class RssFeedDto {
    private int id;
    private String title;
    private URL websiteUrl;

    public RssFeedDto() {
    }

    public RssFeedDto(int id, String title, URL websiteUrl) {
        this.id = id;
        this.title = title;
        this.websiteUrl = websiteUrl;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public URL getWebsiteUrl() {
        return this.websiteUrl;
    }

    public void setWebsiteUrl(URL websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}
