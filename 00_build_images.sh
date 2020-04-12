#!/bin/bash

docker build -t honours-data:frontend ./frontend/

docker build -t honours-data:backend ./backend/
