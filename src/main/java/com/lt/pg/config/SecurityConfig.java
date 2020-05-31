package com.lt.pg.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
                http
                    .csrf().disable() // temp fix for enable hawtio and easy test for api
                    .authorizeRequests()
                    .antMatchers("/api/*").authenticated().and()
                    .formLogin();
    }

    @Override
    // WebSecurity is superset of HttpSecurity. E.g. if h2-console ignored, then
    // HttpSecurity authenticated has no effect
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
            .antMatchers("/h2-console/**");
    }
}
