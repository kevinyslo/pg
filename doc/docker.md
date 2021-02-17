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
            > sudo docker run -dp 3000:3000 -w /app -v "$(pwd):/app" node:1 2-alpine sh -c "npm config set proxy http://proxy1.scig.gov.hk:8080 && npm config set https-proxy http://proxy1.scig.gov.hk:8 080 && npm install && npm run dev"
- docker logs
    - > sudo docker logs <container id> -f 
- The docker system prune command removes all stopped containers, dangling images, and unused networks:
    - > sudo docker system prune
- Multi container apps 
    - https://docs.docker.com/get-started/07_multi_container/
    - each container should do one thing and do it well

