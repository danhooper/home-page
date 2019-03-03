package com.danhooper.homepage.service;

import com.danhooper.homepage.model.RssArticle;
import com.danhooper.homepage.model.RssFeed;
import com.rometools.rome.feed.synd.SyndContent;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class RssArticleServiceImpl implements RssArticleService {
    public List<RssArticle> getArticles(RssFeed rssFeed) {
        SyndFeedInput input = new SyndFeedInput();
        try {
            SyndFeed feed = input.build(new XmlReader(rssFeed.getFeedUrl()));
            return feed.getEntries().stream()
                    .filter(syndEntry -> {
                        System.out.println("Syndentry is null for " + rssFeed.getFeedUrl().toString());
                        return syndEntry != null;
                    })
                    .map(syndEntry -> {
                        SyndContent description = syndEntry.getDescription();
                        String desc = description == null ? "" : description.getValue();
                        return new RssArticle(syndEntry.getTitle(), syndEntry.getContents(), desc, syndEntry.getUri());
                    }).collect(Collectors.toList());
        } catch (FeedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
