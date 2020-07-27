package com.lt.pg.config;

import com.atomikos.jms.AtomikosConnectionFactoryBean;
import org.apache.activemq.ActiveMQPrefetchPolicy;
import org.apache.activemq.ActiveMQXAConnectionFactory;
import org.apache.activemq.RedeliveryPolicy;
import org.apache.activemq.broker.BrokerService;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.*;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.SimpleJmsListenerContainerFactory;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.util.backoff.FixedBackOff;

import javax.jms.ConnectionFactory;
import javax.jms.Queue;
import javax.jms.Session;

import static org.apache.activemq.ActiveMQSession.INDIVIDUAL_ACKNOWLEDGE;

@Configuration
@EnableJms
public class JmsConfig {

    @Profile("dev-gw")
    @Bean
    public ConnectionFactory connectionFactory() {
        // Create embedded activemq with XA connection factory and don't create broker service first
        // ref: http://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection.html
        ActiveMQXAConnectionFactory cf = new ActiveMQXAConnectionFactory("vm://localhost?create=false");
        // Set trust package here instead
        cf.setTrustAllPackages(true);
//        ActiveMQPrefetchPolicy activeMQPrefetchPolicy = new ActiveMQPrefetchPolicy();
//        activeMQPrefetchPolicy.setAll(-1);
//        cf.setPrefetchPolicy(activeMQPrefetchPolicy);
//        RedeliveryPolicy queuePolicy = new RedeliveryPolicy();
//        queuePolicy.setMaximumRedeliveries(-1);    // Don't pass to DLQ
//        cf.setRedeliveryPolicy(queuePolicy);
//        return cf;
        // Using Atomikos JTA Connection Factory for Atomkios transaction management.
        // We can use DefaultJmsListenerContainerFactory without customization
        AtomikosConnectionFactoryBean atomikosConnectionFactoryBean = new AtomikosConnectionFactoryBean();
        atomikosConnectionFactoryBean.setMaxPoolSize(10);
        atomikosConnectionFactoryBean.setXaConnectionFactory(cf);
        atomikosConnectionFactoryBean.setUniqueResourceName("xamq");
        return atomikosConnectionFactoryBean;
    }

    @Profile("dev-gw")
    @Bean
    public BrokerService broker() throws Exception {
        final BrokerService broker = new BrokerService();
        broker.addConnector("tcp://localhost:61616");
        broker.setPersistent(false);
        return broker;
    }

    @Profile({"dev-gw", "uat"})
    @Bean
    // If customize DefaultJmsListenerContainerFactory, e.g. concurrency, we should inject DefaultJmsListenerContainerFactoryConfigurer
    // bean for allowing Atomkios transaction management
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
            ConnectionFactory connectionFactory, DefaultJmsListenerContainerFactoryConfigurer configurer) {
        // DefaultJmsListenerContainerFactory loops create customer session involved unwanted traffic with the broker
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
//        factory.setMaxMessagesPerTask(1);
        // min 1 up to max 5 connections
        factory.setConcurrency("1-5");
        // Jms consumer will wait 30s for receiving message
        factory.setReceiveTimeout(30000L);
//        factory.setSessionAcknowledgeMode(INDIVIDUAL_ACKNOWLEDGE);
        configurer.configure(factory, connectionFactory);
        return factory;
    }

    // In fact, AbstractPollingMessageListenerContainer has instance of DefaultTransactionDefinition
    // which default timeout is -1 (no limit)
//    @Bean
//    public DefaultTransactionDefinition transactionDefinition() {
//        DefaultTransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
//        transactionDefinition.setTimeout(30);
//        return transactionDefinition;
//    }


 }
