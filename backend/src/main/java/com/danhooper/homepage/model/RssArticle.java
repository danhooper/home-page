package com.danhooper.homepage.model;

public class RssArticle {
    private final String title;
    private final String description;

    public RssArticle(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
