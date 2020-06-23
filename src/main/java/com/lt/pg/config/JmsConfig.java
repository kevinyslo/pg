package com.lt.pg.config;

import org.apache.activemq.ActiveMQXAConnectionFactory;
import org.apache.activemq.broker.BrokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.jms.annotation.EnableJms;

@Profile("dev-gw")
@Configuration
public class JmsConfig {

    @Bean
    public ActiveMQXAConnectionFactory connectionFactory() {
        ActiveMQXAConnectionFactory cf = new ActiveMQXAConnectionFactory("vm://localhost?create=false");
        return cf;
    }

    @Bean
    public BrokerService broker() throws Exception {
        final BrokerService broker = new BrokerService();
        broker.addConnector("tcp://localhost:61616");
//        broker.addConnector("vm://localhost");
        broker.setPersistent(false);
        return broker;
    }
 }
