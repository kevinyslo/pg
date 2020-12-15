# HA Mysql Cluster
- https://towardsdatascience.com/high-availability-mysql-cluster-with-load-balancing-using-haproxy-and-heartbeat-40a16e134691
 
## Steps  
1. Virtual network interface in Ubuntu 
    - Refer to /etc/network/interfaces in server1 and server2 
    - /etc/init.d/networking restart
    - Reference 
        - https://vitux.com/ubuntu-network-configuration/
        - https://linuxconfig.org/configuring-virtual-network-interfaces-in-linux
        - https://wiki.ubuntu.com/vlan
        - https://askubuntu.com/questions/1031709/ubuntu-18-04-switch-back-to-etc-network-interfaces
        - https://askubuntu.com/questions/739647/creating-multiple-virtual-adapters-over-a-single-physical-nic
2. Virtual box networking 
    - https://blogs.oracle.com/scoter/networking-in-virtualbox-v2
    - http://www.virtualbox.org/manual/ch06.html#network_nat_service
3. Mysql 
    - https://medium.com/@benmorel/remove-the-mysql-root-password-ba3fcbe29870
4. Port forwarding 
    - https://afteracademy.com/blog/how-to-convert-your-laptop-desktop-into-a-server-and-host-internet-accessible-website-on-it-part-2-cdb4b3633fa9

## Problem found 
- As 12/4, as master-master down many times times and expire log days are short (10 days), this occurs both masters with below errors :
        "Last_Errno: 1594
        Last_Error: Relay log read failure: Could not parse relay log event entry. The possible reasons are: the master's binary log is corrupted (you can check this by running 'mysqlbinlog' on the binary log), the slave's relay log is corrupted (you can check this by running 'mysqlbinlog' on the relay log), a network problem, or a bug in the master's or slave's MySQL code. If you want to check the master's binary log or slave's relay log, you will be able to know their names by issuing 'SHOW SLAVE STATUS' on this slave."      
and cannot recovered by change master log and pos 
    - Thus, we should use master-slave for HA for better stability 
    - (How use slave for recovery?)
        - https://dev.mysql.com/doc/mysql-replication-excerpt/5.7/en/replication-solutions-switch.html

- As 13/4, found server 3 mysql cannot startup :
2020-04-13T07:15:24.539572Z 0 [ERROR] /usr/sbin/mysqld: Table './mysql/user' is marked as crashed and should be repaired
2020-04-13T07:15:24.539771Z 0 [ERROR] Fatal error: Can't open and lock privilege tables: Table './mysql/user' is marked as crashed and should be repaired
    - The fixing is : myisamchk --recover --quick /var/lib/mysql/mysql/user
- As 16/4, found slave status  Last_SQL_Errno: 1032
    - The fixing is :  mysqlbinlog -v --base64-output=DECODE-ROWS mysql-bin.000001

## Addon features 
### 1. Mysql Master Slave
- https://devopscube.com/setup-mysql-master-slave-replication/

### 2. Haproxy SSL web server with domain name
- https://serversforhackers.com/c/using-ssl-certificates-with-haproxy
- https://blog.miniasp.com/post/2019/02/25/Creating-Self-signed-Certificate-using-OpenSSL
- http://cbonte.github.io/haproxy-dconv/1.8/configuration.html
- Apache2 Logging 
    - https://stackoverflow.com/questions/525057/why-cant-i-get-apaches-customlog-directive-to-work
    - https://www.loggly.com/ultimate-guide/apache-logging-basics/ 
- Block IP from web server (apache)
    - https://helpx.adobe.com/hk_zh/experience-manager/kb/block-ips-apache-http-server.html
    - https://stackoverflow.com/questions/3264233/apache-block-an-ip-address-from-accessing-the-website
    - https://httpd.apache.org/docs/2.4/mod/mod_authz_core.html#require
    - https://stackoverflow.com/questions/41603383/how-to-install-mod-authz-core-module-for-mamp-installed-apache
    - https://www.tecmint.com/check-apache-modules-enabled/
        - Show loaded modules: > apache2ctl -M
        - https://192.168.0.109/server-status
    - Steps :     
        - For using load balancer (haproxy), load remoteip module: > ln -s ../mods-available/remoteip.load remoteip.load 
        - Include block-ip.conf to RemoteIPHeader X-Forwarded-For
        - In apache2.conf, Require not ip {blocked-ip}, e.g. 112.119.222.120    
- CRS and Prevent Dos (apache)
    - https://www.tecmint.com/protect-apache-using-mod_security-and-mod_evasive-on-rhel-centos-fedora/
    - https://www.tecmint.com/useful-basic-commands-of-apt-get-and-apt-cache-for-package-management/
    - https://help.ubuntu.com/community/UFW
        > whois 112.119.222.120
        > ufw status
            Status: active
            To                         Action      From
            --                         ------      ----
            443                        ALLOW       Anywhere
            80                         ALLOW       Anywhere
            Anywhere                   ALLOW       192.168.0.109
            3306                       ALLOW       Anywhere
            Anywhere                   ALLOW       192.168.0.0/24
            443 (v6)                   ALLOW       Anywhere (v6)
            80 (v6)                    ALLOW       Anywhere (v6)
            3306 (v6)                  ALLOW       Anywhere (v6)
    - https://hostadvice.com/how-to/how-to-setup-modsecurity-for-apache-on-ubuntu-18-04/
    - https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-%28v2.x%29
    - https://www.atlantic.net/vps-hosting/how-to-install-and-configure-modevasive-with-apache-on-ubuntu-18-04/
    - http://codingshower.com/apache-server-get-actual-client-ip-address-behind-proxy-or-load-balancer/
    - Behine reverse proxy / load balance, mod evasive is not feasible since it will block proxy traffic to cause the site down !
- Check my ip address (including ISP, country, ..)
    - https://whatismyipaddress.com/
- Haproxy + Jboss is ok, Haproxy + apache2 is for testing only
    - From haproxy.log, it can see the client ip and request path 
        Nov 29 15:32:57 server1 haproxy[1093]: 192.168.0.109:53984 [29/Nov/2020:15:32:57.564] web-cluster~ web-cluster/web-1 0/0/0/1/1 200 3421 - - ---- 1/1/0/1/0 0/0 "GET /index.html HTTP/1.1"

### 3. Corosync + Pacemaker 
1. Found Problems 
- As using heartbeat, when haproxy process down in active server, try to passivate it by /usr/share/hb_standby. But it is not working because heartbeat should use crm (pacemaker). But current pacemaker not support heartbeat 

2. Solution 
- https://medium.com/@yenthanh/high-availability-using-corosync-pacemaker-on-ubuntu-16-04-bdebc6183fc5
- http://www.linux-ha.org/wiki/Pacemaker
- Scripting  
    - Steps (approach 1)
        1. Use crontab to run the job in 1 min 
        2. Check killed haproxy process 
        3. If haproxy killed, check the node is active 
        4. If the node is online, swtich the node to standby 
        5. The other node is online, the pacemaker send alert email 
    - Linux Shell script ref 
        - https://devhints.io/bash
        - https://learnxinyminutes.com/docs/bash/
        - https://bash.cyberciti.biz/guide/Trap_statement
        - http://tldp.org/LDP/abs/html/comparison-ops.html#CCOMPARISON1
        - https://askubuntu.com/questions/222512/cron-info-no-mta-installed-discarding-output-error-in-the-syslog
        - https://stackoverflow.com/questions/14637979/how-to-permanently-set-path-on-linux-unix
        - https://apple.stackexchange.com/questions/51036/what-is-the-difference-between-bash-profile-and-bashrc
        - https://documentation.suse.com/sle-ha/12-SP4/html/SLE-HA-all/cha-ha-manual-config.html
        - http://crmsh.github.io/scripts/
        - https://blog.gtwang.org/linux/linux-ssh-public-key-authentication/
        - https://www.linode.com/docs/security/authentication/use-public-key-authentication-with-ssh/ (Used this)
        - https://www.mankier.com/7/ocf_heartbeat_MailTo
        - https://www.linode.com/docs/email/postfix/postfix-smtp-debian7/
        - https://gist.github.com/beekhof/5589599
        - https://crmsh.github.io/man-2.0/#cmdhelp_configure_monitor
        - https://books.google.com.hk/books?id=lE0JBAAAQBAJ&pg=PT657&lpg=PT657&dq=mailto+params+crm&source=bl&ots=hEWW5SUBHH&sig=ACfU3U3VHx2tTGdKqV9x_HlLzmfm7cYciw&hl=zh-TW&sa=X&ved=2ahUKEwiYusOJ1f7nAhUBy4sBHW4ABBoQ6AEwA3oECAoQAQ#v=onepage&q=mailto&f=false
        - https://www.axigen.com/documentation/v3-pacemaker-configuration-style-p1411646
        - https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/configuring_the_red_hat_high_availability_add-on_with_pacemaker/s1-resourceopts-haar
        - https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sect-managing_services_with_systemd-unit_files
        - https://wiki.archlinux.org/index.php/Systemd

    - The problem 
        - Found using crontab , for 1 min, if haproxy down , users will see blank page in 1 min. Not good 
    - Steps (approach 2)  
        1. while sleep 1s and run by systemd 
        2. Check killed haproxy process 
        3. If haproxy killed, check the node is active 
        4. If the node is online, swtich the node to standby 
        5. The other node is online, the haproxy (corosync) send alert email 
    - Reference  
        - https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6
        - https://unix.stackexchange.com/questions/236084/how-do-i-create-a-service-for-a-shell-script-so-i-can-start-and-stop-it-like-a-d
        - https://unix.stackexchange.com/questions/303926/run-while-true-in-systemd-script
        
    
### Haproxy SSL clustered app server with domain name 
- Run tsw in wildfly app servers using its clustering services 
- Run tsw in wildfly app servers using spring clustering services 


 
    

