# Ref
- https://docs.wildfly.org/14/
- https://github.com/wildfly/quickstart
- https://docs.wildfly.org/14/Getting_Started_Guide.html
- https://docs.wildfly.org/14/Admin_Guide.html
- https://docs.wildfly.org/14/High_Availability_Guide.html
- https://docs.jboss.org/author/display/WFLY8/Load+Balanced+HA+Standalone+Cluster+-+Howto
- https://stackoverflow.com/questions/42907443/wildfly-as-systemd-service


# Commands
- ./standalone.sh --server-config=standalone-full-ha.xml
- ./add-user.sh 
- http://localhost:9990/console

# CLI
- $JBOSS_HOME/bin/jboss-cli.sh --connect
- [standalone@10.10.10.12:9990 server-identity=ssl] pwd
/core-service=management/security-realm=ApplicationRealm/server-identity=ssl
[standalone@10.10.10.12:9990 server-identity=ssl] ls
alias=server                                      keystore-password=password
enabled-cipher-suites=undefined                   keystore-password-credential-reference=undefined
enabled-protocols=["TLSv1","TLSv1.1","TLSv1.2"]   keystore-path=application.keystore
generate-self-signed-certificate-host=localhost   keystore-provider=JKS
key-password=password                             keystore-relative-to=jboss.server.config.dir
key-password-credential-reference=undefined       protocol=TLS
- [standalone@10.10.10.12:9990 socket-binding] pwd
/socket-binding-group=standard-sockets/socket-binding
[standalone@10.10.10.12:9990 socket-binding] ls
ajp                       iiop-ssl                  management-http           txn-status-manager
http                      jgroups-mping             management-https
https                     jgroups-tcp               modcluster
iiop                      jgroups-udp               txn-recovery-environment
- /core-service=platform-mbean/type=runtime:read-attribute(name=system-properties)

# CLI steps 
1. [standalone@10.10.10.12:9990 interface=public]:write-attribute(name=inet-address, value=${jboss.bind.address:10.10.10.12}

# Clustering for standalone mode 
1. In standalone-full-ha.xml, set the private, public, mgmt interface ip for each cluster , e.g. 10.10.10.12 - cluster 1 , 10.10.10.13 - cluster 2 
2. add the user for replication by add-user.sh and add encoded password in standalone-full-ha.xml

# Setup Haproxy (27/3)
- using ext ip , ie. 10.10.10.* wildfly servers for using admin console
- sticky session (for same cluster) - add prefix to app jsession id (cookie JSESSIONID prefix nocache)
    - app2 die, and use app1 -> s1 is added and wildfly replicated the session and its id [example](./haproxy-cookie-prefix.png)

# Resource (Data source , JNDI ...) (30/3 1 wk)
## Data source 
- XA datasource for mysql (quickstart:greeter)
- XA connection for jms, and use xa tx for both datasource and jms (quickstart:greeter)
    - Ref : 
        - XA connection factory : quickstart:XAService 
        - XA context (less code) : quickstart:InvoiceManagerEJB
- Ref:
    - http://www.mastertheboss.com/jboss-server/jboss-datasource/demystifying-datasource-jta-and-xa-settings-on-jboss-wildfly
    - https://stackoverflow.com/questions/39134984/wildfly-10-amq119032-user-does-not-have-permission-create-non-durable-queue-on
    - https://dzone.com/articles/types-of-jmscontext-in-jms-20
    
# Spring boot integration (mysql + jms) (TODO) (6/4 1 wk) (end)
- refer tp spring-boot.md

    