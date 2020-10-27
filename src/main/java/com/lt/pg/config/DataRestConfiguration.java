package com.lt.pg.config;

import com.lt.pg.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class);
        config.setMaxPageSize(Integer.MAX_VALUE);
        config.setDefaultPageSize(Integer.MAX_VALUE);
    }
}

