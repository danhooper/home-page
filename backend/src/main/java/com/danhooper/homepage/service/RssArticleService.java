package com.danhooper.homepage.service;

import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import com.rometools.rome.feed.synd.SyndFeed;
import org.springframework.lang.Nullable;

import java.util.List;

public interface RssArticleService {
    public List<RssArticle> getArticles(RssFeed rssFeed);

    @Nullable
    public SyndFeed getSyndFeed(RssFeed rssFeed);
}
