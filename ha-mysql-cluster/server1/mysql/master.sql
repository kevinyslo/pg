GRANT REPLICATION SLAVE ON *.* TO 'replicauser'@'192.168.15.5' IDENTIFIED BY '1qaz2wsx';
GRANT REPLICATION SLAVE ON *.* TO 'replicauser'@'192.168.15.6' IDENTIFIED BY '1qaz2wsx';

STOP SLAVE;

CHANGE MASTER TO master_host='192.168.15.5', master_port=3306, master_user='replicauser', master_password='1qaz2wsx', master_log_file='mysql-bin.000004', master_log_pos=154;

START SLAVE;