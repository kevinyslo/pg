package com.lt.pg.service;

import com.lt.pg.model.PgUserDetails;
import com.lt.pg.model.User;
import com.lt.pg.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class AppUserService {

    private final UserRepository userRepository;
    private final JmsTemplate jmsTemplate;

    public void createUser(User user) {
        userRepository.save(user);
        jmsTemplate.convertAndSend("java:jboss/exported/jms/queue/test", user);
    }

}
