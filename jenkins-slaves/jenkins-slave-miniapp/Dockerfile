FROM dorowu/ubuntu-desktop-lxde-vnc:bionic

LABEL com.redhat.component="jenkins-slave-miniapp-rhel7-docker" \
      name="openshift3/jenkins-slave-miniapp-rhel7" \
      version="3.11" \
      architecture="x86_64" \
      release="1" \
      io.k8s.display-name="Jenkins Slave miniapp" \
      io.k8s.description="The jenkins slave arachni image has the miniapp tools on top of the jenkins slave base image." \
      io.openshift.tags="openshift,jenkins,slave,miniapp"

#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

#################################################
# Inspired by
# https://github.com/SeleniumHQ/docker-selenium/blob/master/Base/Dockerfile
#################################################

#================================================
# Customize sources for apt-get
#================================================
RUN DISTRIB_CODENAME=$(cat /etc/*release* | grep DISTRIB_CODENAME | cut -f2 -d'=') \
    && echo "deb http://archive.ubuntu.com/ubuntu ${DISTRIB_CODENAME} main universe\n" > /etc/apt/sources.list \
    && echo "deb http://archive.ubuntu.com/ubuntu ${DISTRIB_CODENAME}-updates main universe\n" >> /etc/apt/sources.list \
    && echo "deb http://security.ubuntu.com/ubuntu ${DISTRIB_CODENAME}-security main universe\n" >> /etc/apt/sources.list

RUN sed -i 's#http://\(archive\|security\).ubuntu.com/#http://mirrors.aliyun.com/#' /etc/apt/sources.list \
  && cat /etc/apt/sources.list

RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install software-properties-common \
  && add-apt-repository -y ppa:git-core/ppa

#========================
# Miscellaneous packages
# iproute which is surprisingly not available in ubuntu:15.04 but is available in ubuntu:latest
# OpenJDK8
# rlwrap is for azure-cli
# groff is for aws-cli
# tree is convenient for troubleshooting builds
#========================
ENV LANG C.UTF-8
ENV DISPLAY :1.0
ENV MINI_HOME=/root
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

USER root
RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install --allow-unauthenticated \
    dnsutils \
    openssl \
    gpg-agent \
    dbus \
    libgconf-2-4 \
    ca-certificates \
    openssh-client ssh-askpass\
    ca-certificates \
    openjdk-8-jdk \
    p7zip-full \
    tar zip unzip \
    wget curl \
    git \
    build-essential \
    less nano tree \
    jq \
    python-dev \
    python python-pip groff \
    rlwrap \
    rsync \
    gnupg2 \
  && rm -rf /var/lib/apt/lists/*

# workaround https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=775775
RUN [ -f "/etc/ssl/certs/java/cacerts" ] || /var/lib/dpkg/info/ca-certificates-java.postinst configure
#========================================
# add miniapp developer tools
#========================================
ENV PATH="/root/bin:${PATH}"

COPY ./wxdt/ /root/
RUN chmod +x /root/bin/docker-entrypoint.sh

# 将开发者工具加入supervisord
RUN echo "\n\
[program:wxdt]\n\
priority=25\n\
directory=/root/bin/\n\
command=bash wxdt start\n\
stderr_logfile=/var/log/wxdt.err.log\n\
stdout_logfile=/var/log/wxdt.out.log\n\
" >> /etc/supervisor/conf.d/supervisord.conf

# 安装开发者工具，然后删除下载的文件
RUN update_nwjs.sh \
    && rm -rf /tmp/wxdt_xsp

#========================================
# Add normal user with passwordless sudo
#========================================
# RUN useradd jenkins --shell /bin/bash --create-home \
#   && usermod -a -G sudo jenkins \
#   && echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
#   && echo 'jenkins:secret' | chpasswd

#==========
# Jenkins slave
#==========
# Copy the entrypoint
ADD contrib/bin/* /usr/local/bin/
RUN mkdir -p /home/jenkins
RUN chmod a+rwx /home/jenkins
RUN chmod 664 /etc/passwd

# Run the Jenkins JNLP client
# CMD ["/root/bin/docker-entrypoint.sh"]
ENTRYPOINT ["/usr/local/bin/run-jnlp-client"]