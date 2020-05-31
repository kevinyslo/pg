package com.lt.pg;

import com.lt.pg.model.Authority;
import com.lt.pg.model.User;
import com.lt.pg.repository.AuthorityRepository;
import com.lt.pg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Profile("dev")
@Configuration
public class InitData {

    @Autowired
    public void init(PasswordEncoder passwordEncoder, UserRepository userRepository, AuthorityRepository authorityRepository) {
        authorityRepository.save(Authority.builder().name("MANAGER").build());
        authorityRepository.save(Authority.builder().name("USER").build());

       userRepository.save(User.builder().username("admin").password(
                passwordEncoder.encode("admin")).enabled(true).
                authorities(authorityRepository.findAllById(Arrays.asList("MANAGER", "USER"))).build());
    }

}
