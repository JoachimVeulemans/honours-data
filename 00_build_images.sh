#!/bin/bash

docker build -t joachimveulemans/honours-data:frontend ./frontend/

docker build -t joachimveulemans/honours-data:backend ./backend/
