package com.lt.pg.resource;

import com.lt.pg.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/app/user")
@AllArgsConstructor
public class AppUserResource {
    
    private final JmsTemplate jmsTemplate;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody User user) {
        jmsTemplate.convertAndSend("java:out-queue", user); 
    }
}