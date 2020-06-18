package com.lt.pg.service;

import com.lt.pg.model.User;
import com.lt.pg.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Profile("dev-gw")
@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class GatewayUserService {

    private final UserRepository userRepository;

    //TODO : dequeue cannot rollback
    public void processMessage(User user) {
        userRepository.save(user);
        log.info("===================== {}", user);
        throw new RuntimeException();
    }
}