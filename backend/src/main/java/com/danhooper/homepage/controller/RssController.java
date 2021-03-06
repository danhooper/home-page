package com.danhooper.homepage.controller;

import com.danhooper.homepage.config.FeedConfig;
import com.danhooper.homepage.model.RssFeedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
public class RssController {
    @Autowired FeedConfig feedConfig;

    @RequestMapping("/rss")
    public List<RssFeedDto> getFeeds() {

        return feedConfig.getFeedsDto();
    }
}
