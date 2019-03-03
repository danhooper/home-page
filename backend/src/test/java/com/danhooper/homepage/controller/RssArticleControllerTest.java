package com.danhooper.homepage.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.danhooper.homepage.config.FeedConfig;
import com.danhooper.homepage.service.RssArticleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RssArticleControllerTest {

    @MockBean
    RssArticleService rssArticleServiceMock;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FeedConfig feedConfig;

    @Test
    public void getFeeds() throws Exception {

        when(rssArticleServiceMock.getArticles(feedConfig.getFeeds().get(0))).thenReturn(Collections.emptyList());
        mvc.perform(MockMvcRequestBuilders.get("/rss/0/article").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}