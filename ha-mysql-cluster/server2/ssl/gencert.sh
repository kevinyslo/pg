sudo mkdir /etc/ssl/my-cert
sudo openssl genrsa -out /etc/ssl/my-cert/my.key 1024
sudo openssl req -new -key /etc/ssl/my-cert/my.key \
                   -out /etc/ssl/my-cert/my.csr
sudo openssl x509 -req -days 365 -in /etc/ssl/my-cert/my.csr \
                   -signkey /etc/ssl/my-cert/my.key \
                   -out /etc/ssl/my-cert/my.crt
sudo cat /etc/ssl/my-cert/my.crt /etc/ssl/my-cert/my.key \
           | sudo tee /etc/ssl/my-cert/my.pem
