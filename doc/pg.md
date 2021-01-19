# Pg implemented features 
1. Spring boot application 
2. Idea - maven repository 
3. Nexus for proxy repo and release repo 
4. Spring security (22/5)
    - Path accessibility
    - User authentication by Jpa  
    - Hashing password
5. Spring configuration, bean
6. Spring data repository 
7. Spring rest, jta, sql(local), jms(local) (22/5-10/7) 
    - Plot: Create user in site A and send message to site B wildfly mq and it read the message to 
    create user in site B. The reason using wildfly for mq is it allow clustering. 
    - For local test, one instance (dev-a) for site A with local db. Another instance (dev-b) for 
    site B with local db and mq
    - mq ref:
        - https://docs.oracle.com/javaee/7/tutorial/jms-concepts.htm#BNCDQ
        - https://memorynotfound.com/spring-boot-embedded-activemq-configuration-example/
        - https://www.devglan.com/spring-boot/spring-boot-jms-activemq-example 
        - https://activemq.apache.org/vm-transport-reference
        - https://activemq.apache.org/how-can-i-monitor-activemq
        - https://stackoverflow.com/questions/31374726/spring-boot-how-to-add-another-war-files-to-the-embedded-tomcat
        - https://jamesnetherton.github.io/2018/11/14/hawtio-spring-boot-support/
        - https://docs.spring.io/spring/docs/3.0.x/spring-framework-reference/html/jms.html
    - spring web ref:
        - https://docs.spring.io/spring/docs/5.2.5.RELEASE/spring-framework-reference/web.html#mvc-ann-methods
        - https://stackoverflow.com/questions/44108318/spring-boot-start-activemq-web-console-on-startup
    - spring security ref: 
        - https://stackoverflow.com/questions/33125598/how-to-handle-csrf-protection-with-spring-restful-web-services
    - spring boot ref:
        - https://docs.spring.io/spring-boot/docs/2.1.x/reference/html/index.html    
        - https://stackoverflow.com/questions/24783070/gradle-build-spring-boot-app-as-war-with-active-profile
        - https://stackoverflow.com/questions/36923288/how-to-run-bootrun-with-spring-profile-via-gradle-task
        - https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html
        - https://stackoverflow.com/questions/30549489/what-is-this-spring-jpa-open-in-view-true-property-in-spring-boot
    - gradle groovy ref:
        - https://groovy-lang.org/closures.html
        - https://docs.gradle.org/current/dsl/org.gradle.api.tasks.Copy.html 
        - https://docs.gradle.org/current/userguide/groovy_build_script_primer.html
    - window 10 ref
        - https://winaero.com/blog/enable-openssh-server-windows-10/
    - ssh tunnelling ref
        - https://serverfault.com/questions/136788/connect-to-remote-mysql-using-proxy
    - For spring boot 2.2.x (compile by java 8/11), wildfly 14 (run in java 11). It occurs 
        Type 'com/fasterxml/jackson/core/JsonFactory' (current frame, stack[0]) is not assignable 
        to 'com/fasterxml/jackson/core/TokenStreamFactory' (from method signature)                                                                                
    - For spring boot 2.1.x (compile by java 11), wildfly 14 (run in java 11). OK 
    - On 10/6/20, in jboss, it config kev-db which pointed to 192.168.15.6 which is off, that causes
        no connection. The solution is make it pointed to 15.4
    - Connect embedded jms externally 
        - https://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection 
        - https://stackoverflow.com/questions/42681595/how-to-set-activemq-port-in-spring-boot
        - https://livebook.manning.com/book/activemq-in-action/chapter-7/
        - BrokerService can config lately for the embedded activemq broker, e.g. change broker name, connector, ...
    - Jms and jdbc in a tranaction (local and JTA)
        - The problem is jms cannot rollback, e.g. dequeue cannot rollback
        - https://docs.oracle.com/cd/E19798-01/821-1841/bncgh/index.html
        - https://stackoverflow.com/questions/44952601/spring-jms-declarative-transaction-management-using-annotations
        - https://www.jianshu.com/p/fbd5b5f071d4
        - https://www.jianshu.com/p/af41f1b696f0
        - https://stackoverflow.com/questions/54412775/connect-to-embedded-activemq-from-different-spring-boot-project
        - https://codeaches.com/spring-boot/embedded-activemq-5-jms-broker
        - https://activemq.apache.org/vm-transport-reference
        - http://activemq.apache.org/how-do-i-embed-a-broker-inside-a-connection.html
        - http://websystique.com/spring/spring-4-jms-activemq-example-with-jmslistener-enablejms/
        - https://techannotation.wordpress.com/2015/07/21/spring-distributed-transaction-with-atomikos-and-activemq/
        - https://stackoverflow.com/questions/56969964/spring-boot-atomikos-transaction-manager-java-lang-noclassdeffounderror-com-ato
        - https://www.logicbig.com/tutorials/spring-framework/spring-integration/jms-template-with-listener.html
        - https://stackoverflow.com/questions/32185195/jms-message-consumed-despite-transaction-rollback
        - https://stackoverflow.com/questions/44147964/spring-jms-transaction-rollback-message-dequeued-off-activemq
        - https://activemq.apache.org/message-redelivery-and-dlq-handling
        - https://www.cnblogs.com/niit-soft-518/p/6957384.html
        - https://stackoverflow.com/questions/16087213/activemq-consumers-with-prefetch-0-increasing-enqueues-count-in-console-bec    
        - https://activemq.apache.org/what-is-the-prefetch-limit-for
        - https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/common-application-properties.html
    - Emulator in Window 
        - cpu usage 
            - https://superuser.com/questions/176624/linux-top-command-for-windows-powershell
            - https://github.com/gsass1/NTop/releases
    - Jar sites 
        - https://jar-download.com/artifacts/com.atomikos/transactions/4.0.4/source-code
    - Trace why spring Jmslistener recreate session repeatedly 
        - Identify the symptom from broker Jmx that the customer session id is changing repeatedly 
        - Trace Spring code (DefaultMessageListenerContainer.java) where session is closed 
        - Add break point at the session close line 
        - Open debugger to find the thread calling stack 
        - Find out the caller (ActivemqJmsConsumer.receive()) is waiting for the receiveTimeout 
        - The solution is set longer receiveTimeout says 9s before default tx timeout 10s
    - Check xa connection pool (Atomikos)
        - In fact, AbstractPollingMessageListenerContainer has instance of DefaultTransactionDefinition which default timeout is -1 (no limit)
        - But spring.jta.atomikos.properties.default-jta-timeout can control atomikos jta transaction timeout 
        - pool size 
            - JMS AtomikosConnectionFactoryBean max pool size set in JMSConfig 
            - DB datasource pool size set in properties (spring.jta.atomikos.datasource.max-pool-size)
    - Build UI using react to input user and submit post request in site A (Please refer to react.md) 
    - Spring find request session with undertow by default 
        - Undertow find JESSIONID from request cookie 
        - Its session manager match session id of each sessions in the server 
        - The session will store spring security context, e.g. the context has principal 

8. sql(mysql), jms(wildfly) : todo 
    - todo : deploy 2.2.x to latest wildfly (later)
    

# Git connect 
- https://blog.techbridge.cc/2018/01/17/learning-programming-and-coding-with-python-git-and-github-tutorial/
- ssh 
    - https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/how-to-setup-ssh-config-%E4%BD%BF%E7%94%A8-ssh-%E8%A8%AD%E5%AE%9A%E6%AA%94-74ad46f99818

# JMS
- Problem: XA transaction cannot rollback in local 
    - [atomiko](./Transactions-with-Spring.pdf)

- Datasource concept 
    - https://zetcode.com/java/datasource/
