# 1 - Define base image
FROM ubuntu:18.04

# 2 - Run apt update
RUN apt-get update 

# 3 - Run apt upgrade
RUN apt-get upgrade -y 

# 4 - Install needed packages
RUN apt-get install -y apache2 python3 python3-pip libapache2-mod-wsgi-py3

# 5 - Copy requirements file for pip install
COPY requirements.txt /var/www/public/requirements.txt

# 6 - Install packages via pip3
RUN pip3 install -r /var/www/public/requirements.txt

# 7 - Make sure we get the output to our console
RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log && \
    ln -sf /proc/self/fd/1 /var/log/apache2/error.log

# 8 - Expose port 80 for endpoint connection
EXPOSE 80

# 9 - Make needed directories
RUN mkdir -p /var/www/public/current/
RUN mkdir -p /var/www/public/deleted/

# 10 - Copy project files to docker container
COPY . /var/www/public

# 11 - Make files executable in docker container
RUN chmod a+rwx -R var/www/public

# 12 - Copy apache configuration
ADD apache.conf /etc/apache2/sites-enabled/000-default.conf

# 13 - Start Apache
CMD /usr/sbin/apache2ctl -D FOREGROUND
