package com.lt.pg.resource;

import com.lt.pg.model.User;
import com.lt.pg.repository.UserRepository;
import com.lt.pg.service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api/app/user")
@RequiredArgsConstructor
@Slf4j
public class AppUserResource {

    private final AppUserService appUserService;
    private final UserRepository userRepository;
    private final static String ATTR1 = "attr1";

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody User user) {
        appUserService.createUser(user);
    }

    @GetMapping(path = "/{id}")
    public Optional<User> getUser(@PathVariable Long id, HttpServletRequest request) {
        log.info("Before set session id : {}", request.getSession().getId());
        log.info("Before set session : {}", request.getSession().getAttribute(ATTR1));
        request.getSession().setAttribute(ATTR1, "kevin");
        log.info("After set session id : {}", request.getSession().getId());
        log.info("After set session : {}", request.getSession().getAttribute(ATTR1));
        return userRepository.findById(id);
    }

}