package com.lt.pg.config;

import com.atomikos.jms.AtomikosConnectionFactoryBean;
import org.apache.activemq.ActiveMQPrefetchPolicy;
import org.apache.activemq.ActiveMQXAConnectionFactory;
import org.apache.activemq.RedeliveryPolicy;
import org.apache.activemq.broker.BrokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.*;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.jms.ConnectionFactory;
import javax.jms.Session;

@Profile("dev-gw")
@Configuration
@EnableJms
public class JmsConfig {

    @Bean
    public ConnectionFactory connectionFactory() {
        // Create embedded activemq with XA connection factory and don't create broker service first
        // ref: http://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection.html
        ActiveMQXAConnectionFactory cf = new ActiveMQXAConnectionFactory("vm://localhost?create=false");
        // Set trust package here instead
        cf.setTrustAllPackages(true);
//        ActiveMQPrefetchPolicy activeMQPrefetchPolicy = new ActiveMQPrefetchPolicy();
//        activeMQPrefetchPolicy.setAll(2);
//        cf.setPrefetchPolicy(activeMQPrefetchPolicy);
//        RedeliveryPolicy queuePolicy = new RedeliveryPolicy();
//        queuePolicy.setMaximumRedeliveries(-1);    // Don't pass to DLQ
//        cf.setRedeliveryPolicy(queuePolicy);
//        return cf;
        // Using Atomikos JTA Connection Factory for Atomkios transaction management.
        // We can use DefaultJmsListenerContainerFactory without customization
        AtomikosConnectionFactoryBean atomikosConnectionFactoryBean = new AtomikosConnectionFactoryBean();
        atomikosConnectionFactoryBean.setXaConnectionFactory(cf);
        atomikosConnectionFactoryBean.setUniqueResourceName("xamq");
        return atomikosConnectionFactoryBean;
    }

    @Bean
    public BrokerService broker() throws Exception {
        final BrokerService broker = new BrokerService();
        broker.addConnector("tcp://localhost:61616");
//        broker.addConnector("vm://localhost");
        broker.setPersistent(false);
        return broker;
    }

    @Bean
    // If customize DefaultJmsListenerContainerFactory, e.g. concurrency, we should inject DefaultJmsListenerContainerFactoryConfigurer
    // bean for allowing Atomkios transaction management
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
            ConnectionFactory connectionFactory, DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConcurrency("1-1");
        configurer.configure(factory, connectionFactory);
        return factory;
    }

    //TODO: found consumer seesionid changing 
 }
