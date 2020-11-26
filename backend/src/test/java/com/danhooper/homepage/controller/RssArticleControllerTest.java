package com.danhooper.homepage.controller;

import com.danhooper.homepage.config.FeedConfig;
import com.danhooper.homepage.service.RssArticleService;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.File;
import java.io.IOException;
import java.util.Collections;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RssArticleControllerTest {

    @SpyBean
    RssArticleService rssArticleServiceSpy;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FeedConfig feedConfig;

    @Test
    public void getFeedsEmpty() throws Exception {
        when(rssArticleServiceSpy.getArticles(feedConfig.getFeeds().get(0))).thenReturn(Collections.emptyList());

        mvc.perform(MockMvcRequestBuilders.get("/rss/0/article").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(content().json("[]"));
    }

    @Test
    public void getFeedsSample() throws Exception {
        when(rssArticleServiceSpy.getSyndFeed(feedConfig.getFeeds().get(0))).then(invocation -> this.getSampleFeed());

        mvc.perform(MockMvcRequestBuilders.get("/rss/0/article").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(20)));
    }

    @Nullable
    private SyndFeed getSampleFeed() {
        SyndFeedInput input = new SyndFeedInput();
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("sample-rss.xml").getFile());
        try {
            return input.build(new XmlReader(file));
        } catch (FeedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
