show processlist;

stop slave;

reset master;

create user 'replicauser'@'192.168.15.4' IDENTIFIED BY '1qaz2wsx';
GRANT REPLICATION SLAVE ON *.* TO 'replicauser'@'192.168.15.4' IDENTIFIED BY '1qaz2wsx';