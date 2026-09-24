### Local Load Balancer

## How to run

```bash

# install and build
npm install
npm run build
npm run dev # HEALTH_INTERVAL=10000 (10 sec) npm run dev


# build docker image
docker build -t backend-server .

# start 3 servers (or can create a script)
docker run -it -d -e SERVER_NUMBER=1 -p 3001:3001 backend-server
docker run -it -d -e SERVER_NUMBER=2 -p 3002:3002 backend-server
docker run -it -d -e SERVER_NUMBER=3 -p 3003:3003 backend-server


# send requests to see traffic is being distributed
curl --parallel --parallel-immediate --parallel-max 5 --config urls.txt
```
