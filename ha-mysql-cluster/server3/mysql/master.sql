
STOP SLAVE;

CHANGE MASTER TO master_host='192.168.15.4', master_port=3306, master_user='replicauser', master_password='1qaz2wsx', master_log_file='mysql-bin.000006', master_log_pos=1536;

START SLAVE;

