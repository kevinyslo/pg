package com.lt.pg.service;

import com.lt.pg.model.User;
import com.lt.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AppUserService {

    private final UserRepository userRepository;
    private final JmsTemplate jmsTemplate;

    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
        jmsTemplate.convertAndSend("java:jboss/exported/jms/queue/test", user);
        // In Jta transaction, as rollback, both jdbc and jms rollback
        if (user.getUsername().equals("admin2")) {
            throw new RuntimeException("admin2 should throw exception");
        }
    }

}
