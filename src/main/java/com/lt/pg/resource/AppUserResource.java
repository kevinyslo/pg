package com.lt.pg.resource;

import com.lt.pg.model.User;
import com.lt.pg.service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/app/user")
@RequiredArgsConstructor
public class AppUserResource {

    private final AppUserService appUserService;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody User user) {
        appUserService.createUser(user);
    }

}