# 1 - Define base image
FROM ubuntu:18.04

# 2 - Run apt update
RUN apt-get update 

# 3 - Run apt upgrade
RUN apt-get upgrade -y 

# 4 - Install needed packages
RUN apt-get install apache2 python3 python3-pip -y

# 5 - Remove old libapache2-mod-wsgi
RUN apt-get -y remove libapache2-mod-wsgi

# 6 - Install new libapache2-mod-wsgi-py3
RUN apt-get -y install libapache2-mod-wsgi-py3

# 7 - Install packages via pip3
RUN pip3 install pillow Flask requests flask-cors flask-login

# 8 - Make sure we get the output to our console
RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log && \
    ln -sf /proc/self/fd/1 /var/log/apache2/error.log

# 9 - Expose port 80 for endpoint connection
EXPOSE 80

# 10 - Copy project files to docker container
COPY . /var/www/public

# 11 - Make files executable in docker container
RUN chmod a+rwx -R var/www/public

# 12 - Copy apache configuration
ADD apache.conf /etc/apache2/sites-enabled/000-default.conf

# 13 - Start Apache
CMD /usr/sbin/apache2ctl -D FOREGROUND
