package com.danhooper.homepage.config;

import com.danhooper.homepage.model.RssFeed;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix="cors")
public class CorsConfig {
    private List<String> origins = new ArrayList<>();

    public List<String> getOrigins() {
        return this.origins;
    }

    public void setFeeds(List<String> origins) {
        this.origins = origins;
    }
}
