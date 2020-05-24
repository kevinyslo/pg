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
    - ref:
        - https://docs.oracle.com/javaee/7/tutorial/jms-concepts.htm#BNCDQ 
8. sql(mysql), jms(wildfly)