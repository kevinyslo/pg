package com.lt.pg.service;

import com.lt.pg.model.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@AllArgsConstructor
@Slf4j
public class GatewayUserService {

    @JmsListener(destination = "java:jboss/exported/jms/queue/test")
    public void processMessage(User user) {
        log.debug("===================== {}", user);
    }
}