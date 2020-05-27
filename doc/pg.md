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
7. Spring rest, jta, sql(local), jms(local) (22/5-?) 
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
8. sql(mysql), jms(wildfly)

# Git connect 
- https://blog.techbridge.cc/2018/01/17/learning-programming-and-coding-with-python-git-and-github-tutorial/
- ssh 
    - https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/how-to-setup-ssh-config-%E4%BD%BF%E7%94%A8-ssh-%E8%A8%AD%E5%AE%9A%E6%AA%94-74ad46f99818
    