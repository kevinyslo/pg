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
    - https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-jta.html
    - This should handle in code , rather than by debugger throw exception. May be Spring transaction manager cannot notice
    - Spring JTA transaction manager (wrapper of Atomiko transaction manager in dev) for DataSource [jdbc](Atomiko Data source in dev) and ConnectionFactory [jms] (AtomikosConnectionFactoryBean in dev) 
- Datasource concept 
    - https://zetcode.com/java/datasource/

# UAT Setup 
- Setup remote jndi 
    - https://access.redhat.com/documentation/en-us/jboss_enterprise_application_platform_continuous_delivery/17/html/development_guide/remote_jndi_lookup
    - http://www.mastertheboss.com/jboss-server/jboss-jms/connecting-to-an-external-wildfly-jms-server
    - Java annotation and annotation processor (java 1.5) : 
        - https://www.baeldung.com/java-custom-annotation
        - https://iammert.medium.com/annotation-processing-dont-repeat-yourself-generate-your-code-8425e60c6657
        - https://tomgregory.com/annotation-processors-in-gradle-with-the-annotationprocessor-dependency-configuration/
        - gradle task :
            - https://docs.gradle.org/current/dsl/org.gradle.api.Task.html
            - https://stackoverflow.com/questions/41369110/what-exactly-is-task-type-in-gradle
            - https://stackoverflow.com/questions/46024574/gradle-task-definition-syntax
                - project.getTasks().createTask([name: 'greeting', type: GreetingTask])
        - gradle idea plugin :
            - https://docs.gradle.org/current/dsl/org.gradle.plugins.ide.idea.model.IdeaModule.html
        - build android 
            - Use jdk 1.8 (avoid Could not initialize class com.android.sdklib.repository.AndroidSdkHandler)
            - Accept android license : https://stackoverflow.com/questions/38096225/automatically-accept-all-sdk-licences
            - To match gradle version and android plugin : https://developer.android.com/studio/releases/gradle-plugin
    
    - Tar server1 wildfly and cp to server3 as client
    -  
- Systemctl 
    - https://www.tecmint.com/list-all-running-services-under-systemd-in-linux/
- Netty 
    - https://juejin.cn/post/6844903703183360008
    - https://www.baeldung.com/netty
- crm 
    - Both kev-A and kev-B node is online 
    - root@server2:/# crm status
            Stack: corosync
            Current DC: kev-B (version 1.1.18-2b07d5c5a9) - partition WITHOUT quorum
            Last updated: Tue Jan 26 17:00:40 2021
            Last change: Tue Jan 26 15:44:55 2021 by root via cibadmin on kev-B

            3 nodes configured
            2 resources configured

            Online: [ kev-B ]
            OFFLINE: [ kev-A server1 ]

            Full list of resources:

            virtual_public_ip      (ocf::heartbeat:IPaddr2):       Started kev-B
            mail_to        (ocf::heartbeat:MailTo):        Started kev-B
    -  root@server1:/etc# crm status
            Stack: corosync
            Current DC: kev-A (version 1.1.18-2b07d5c5a9) - partition WITHOUT quorum
            Last updated: Tue Jan 26 17:02:09 2021
            Last change: Mon Jan 25 16:49:52 2021 by root via crm_attribute on kev-A

            3 nodes configured
            2 resources configured

            Online: [ kev-A ]
            OFFLINE: [ kev-B server1 ]

            Full list of resources:

            virtual_public_ip      (ocf::heartbeat:IPaddr2):       Started kev-A
            mail_to        (ocf::heartbeat:MailTo):        Started kev-A
- Setup gradle build for wildfly 
    - script plugin : https://docs.gradle.org/current/userguide/plugins.html
    - https://www.cyberciti.biz/faq/linux-list-all-members-of-a-group/
    - create user: https://linuxize.com/post/how-to-create-users-in-linux-using-the-useradd-command/
    - zsh : 
        - https://github.com/ohmyzsh/ohmyzsh
    - deploy pg to wildfly :
        - http://www.mastertheboss.com/jboss-server/jboss-deploy/how-to-deploy-applications-on-wildfly
        - https://kodejava.org/how-do-i-pass-password-to-sudo-commands/
        - https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service
            - > journalctl -ru wildfly
- Clustering for jms 
    - https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.2/html-single/configuration_guide/index#jgroups_troubleshooting
    - https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.2/html/configuring_messaging/messaging-ha#ha_policies
    - http://www.mastertheboss.com/jboss-server/jboss-jms/jms-clustering-in-wildfly-and-jboss-eap
    - http://www.mastertheboss.com/jboss-server/jboss-eap/what-is-the-difference-between-jboss-eap-wildfly-and-jboss-as
    - show installed pkg : > dpkg -l 
    - https://techdocs.broadcom.com/us/en/symantec-security-software/identity-security/identity-manager/14-3/installing/install-on-jboss-or-wildfly/jboss-or-wildfly-cluster-installation/install-on-the-cluster.html
    - nfs 
        - https://www.tecmint.com/install-nfs-server-on-ubuntu/
    - Cluster by master-slave replicaton 
        - The problem is jboss console cannot view the mq message of slave in backup (inactive) mode (i.e. master is on live) and then we don't know whether message backup in slave as master is on live
        - As master down, we can view slave messages. But as master on again, slave become backup mode , we cannot view again  
        - Also , as two masters and one slave, the slave cannot backup even shutdown 2 masters 
    - Cluster by master-slave shared stored 
        - https://developer.jboss.org/thread/276360
    
# BlockChain 
- https://ethereum.org/en/
- https://github.com/ethereum
- https://www.devteam.space/blog/how-to-use-blockchain-to-build-a-scalable-database/
- Blockchain node
    - https://www.smashingmagazine.com/2020/02/cryptocurrency-blockchain-node-js/
    - https://www.google.com/search?client=firefox-b-d&q=blockchain+node+implementation
    - https://jis-eurasipjournals.springeropen.com/articles/10.1186/s13635-019-0085-3