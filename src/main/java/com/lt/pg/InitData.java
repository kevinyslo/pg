package com.lt.pg;

import com.lt.pg.model.Authority;
import com.lt.pg.model.User;
import com.lt.pg.repository.AuthorityRepository;
import com.lt.pg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class InitData {

    @Autowired
    public void init(PasswordEncoder passwordEncoder, UserRepository userRepository, AuthorityRepository authorityRepository) {
        authorityRepository.save(Authority.builder().name("MANAGER").build());
        authorityRepository.save(Authority.builder().name("USER").build());

        User user = User.builder().username("admin").password(
                passwordEncoder.encode("admin")).enabled(true).build();
        user.getAuthorities().add(authorityRepository.getOne("MANAGER"));
        user.getAuthorities().add(authorityRepository.getOne("USER"));
        userRepository.save(user);
        user = User.builder().username("sophie").password(
                passwordEncoder.encode("9596")).enabled(true).build();
        userRepository.save(user);
    }

}
