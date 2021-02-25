# Docker 
## Understand concept (with practice too)
- try docker: https://www.docker.com/get-started
- https://docs.docker.com/get-started/ 
- chroot: https://codertw.com/%E4%BC%BA%E6%9C%8D%E5%99%A8/375585/
- docker commands 
    - > docker run 
    - > docker image
    - > docker images 
    - > docker rmi
    - > docker container
    - > docker ps 
- docker build and run 
    - https://docs.docker.com/get-started/02_our_app/
    - > sudo docker build -t getting-started .
    - > sudo docker run -dp 3000:3000 getting-started
- docker run with container's separated space
    - > sudo docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"
    - > sudo docker exec 6bc7ba263caa cat /data.txt
- docker mount host machine
    - Named volume 
        - > sudo docker volume create todo-db
        - > sudo docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
    - bind mounts
        - https://docs.docker.com/get-started/06_bind_mounts/
        - Allow development with system images in local by docker 
            > pwd -> /home/swadmin/docker/demo/getting-started/app
            > sudo docker run -dp 3000:3000 -w /app -v "$(pwd):/app" node:1 2-alpine sh -c "npm config set proxy http://proxy1.scig.gov.hk:8080 && npm config set https-proxy http://proxy1.scig.gov.hk:8080 && npm install && npm run dev"
- docker logs
    - > sudo docker logs <container id> -f 
- The docker system prune command removes all stopped containers, dangling images, and unused networks:
    - > sudo docker system prune
- Multi container apps 
    - https://docs.docker.com/get-started/07_multi_container/
    - each container should do one thing and do it well
    - Lot of tools that are useful for troubleshooting or debugging networking issues for docker 
        > sudo docker run -it --network todo-app nicolaka/netshoot
    - dig - DNS lookup utility: > dig 
    - http://linux.vbird.org/linux_server/0140networkcommand.php#traceroute (ifconfig, route)
- Docker compose 
    - > sudo -s (https://superuser.com/questions/241129/why-wont-sudo-cd-work)
    - Logging 
        - container log path: :/var/lib/docker/containers/<container id>/xxxx-json.log
        - https://sematext.com/guides/docker-logs/

## Learn server setup 
- http://linux.vbird.org/linux_server/0107cloudandvm.php
- https://en.wikipedia.org/wiki/Default_gateway        


## install tsw in docker 
- Problem 1
    - ERROR: Error processing tar file(exit status 1): write /mysql/data/tswdb@002dex/document_aud.ibd: no space left on device
    - Ref    
        - https://unix.stackexchange.com/questions/203168/docker-says-no-space-left-on-device-but-system-has-plenty-of-space
        - https://swetava.wordpress.com/2019/11/24/why-docker-throws-a-no-space-left-on-device-error-even-though-system-has-enough-space/
    - Solution 
        - docker root /var/lib/docker has tmp is 15G. Delete the tmp file is ok 


