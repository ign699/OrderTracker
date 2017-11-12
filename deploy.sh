#!/bin/bash
ps auxh | grep node | awk '{print $2}' | xargs kill -9
git pull
nohup npm start
cd client
npm run build
setsid serve -s build &
echo "app deployed"