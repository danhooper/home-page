package com.danhooper.homepage.model;

import com.rometools.rome.feed.synd.SyndContent;

import java.util.List;

public class RssArticle {
    private final String title;
    private final List<SyndContent> content;
    private final String description;
    private final String url;

    public RssArticle(String title, List<SyndContent> content, String description, String url) {
        this.title = title;
        this.content = content;
        this.description = description;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public List<SyndContent> getContent() {
        return content;
    }
}
