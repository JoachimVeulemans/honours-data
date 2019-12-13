#!/bin/bash

docker build -t message-logger-viewer:frontend ./frontend/

docker build -t message-logger-viewer:backend ./backend/
