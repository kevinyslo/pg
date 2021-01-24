package com.lt.pg.service;

import com.lt.pg.model.User;
import com.lt.pg.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Profile("dev-gw")
@Service
@AllArgsConstructor
@Slf4j
public class GatewayUserService {

    private final UserRepository userRepository;

    @Transactional
    @JmsListener(containerFactory = "jmsListenerContainerFactory", destination = "java:jboss/exported/jms/queue/test")
    public void processMessage(User user) {
        // In tx, if rollback, the msg is moved to DLQ (Dead letter queue) by default
        // We can retry to send DQL in ActiveMQ console (Hawio) and this listener will process message again to
        // sync will app db
        boolean isAdmin1Error = true;
        userRepository.save(user);
        if (user.getUsername().equals("admin1") && isAdmin1Error) {
            throw new RuntimeException("admin1 should throw exception");
        }
        log.info("===================== {}", user);
    }
}