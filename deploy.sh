#!/usr/bin/bash
tsc server/*.ts
ssh rpi rm -rf around/
tar -czf around-server.tar.gz server/
ssh rpi mkdir -p around/server/
scp around-server.tar.gz rpi:~/around/
ssh rpi /bin/bash << EOF
    tar -zxvf around/around-server.tar.gz -C around
    node around/server/index.js
EOF
rm around-server.tar.gz