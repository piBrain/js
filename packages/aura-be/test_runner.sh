#!/bin/bash
NODE_ENV=test sequelize db:migrate:undo:all && NODE_ENV=test sequelize db:migrate
NODE_ENV=test node local.js & PID=$! ; sleep 2 ; NODE_ENV=test mocha --full-trace --timeout 150000 --recursive --require babel-core/register --require babel-polyfill ./test/specs; kill $PID
