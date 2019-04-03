FROM ubuntu:16.04

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
RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install \
    iproute \
    openssh-client ssh-askpass\
    ca-certificates \
    openjdk-8-jdk \
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
  && rm -rf /var/lib/apt/lists/* \
  && sed -i 's/securerandom\.source=file:\/dev\/random/securerandom\.source=file:\/dev\/urandom/' ./usr/lib/jvm/java-8-openjdk-amd64/jre/lib/security/java.security && \
  mkdir -p /home/jenkins && \
  chown -R 1001:0 /home/jenkins && \
  chmod -R g+w /home/jenkins && \
  chmod 664 /etc/passwd && \
  chmod -R 775 /etc/alternatives && \
  chmod -R 775 /var/lib/alternatives && \
  chmod -R 775 /usr/lib/jvm && \
  chmod 775 /usr/bin && \
  chmod 775 /usr/lib/jvm-exports && \
  chmod 775 /usr/share/man/man1 && \
  mkdir -p /var/lib/origin && \
  chmod 775 /var/lib/origin && \
  unlink /usr/bin/java && \
  unlink /usr/bin/jjs && \
  unlink /usr/bin/keytool && \
  unlink /usr/bin/orbd && \
  unlink /usr/bin/pack200 && \
  unlink /usr/bin/policytool && \
  unlink /usr/bin/rmid && \
  unlink /usr/bin/rmiregistry && \
  unlink /usr/bin/servertool && \
  unlink /usr/bin/tnameserv && \
  unlink /usr/bin/unpack200 && \
  unlink /usr/lib/jvm-exports/jre && \
  unlink /usr/share/man/man1/java.1.gz && \
  unlink /usr/share/man/man1/jjs.1.gz && \
  unlink /usr/share/man/man1/keytool.1.gz && \
  unlink /usr/share/man/man1/orbd.1.gz && \
  unlink /usr/share/man/man1/pack200.1.gz && \
  unlink /usr/share/man/man1/policytool.1.gz && \
  unlink /usr/share/man/man1/rmid.1.gz && \
  unlink /usr/share/man/man1/rmiregistry.1.gz && \
  unlink /usr/share/man/man1/servertool.1.gz && \
  unlink /usr/share/man/man1/tnameserv.1.gz && \
  unlink /usr/share/man/man1/unpack200.1.gz

# workaround https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=775775
RUN [ -f "/etc/ssl/certs/java/cacerts" ] || /var/lib/dpkg/info/ca-certificates-java.postinst configure

# workaround "You are using pip version 8.1.1, however version 9.0.1 is available."
RUN pip install --upgrade pip setuptools

#========================================
# Add normal user with passwordless sudo
#========================================
RUN useradd jenkins --shell /bin/bash --create-home \
  && usermod -a -G sudo jenkins \
  && echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
  && echo 'jenkins:secret' | chpasswd

#====================================
# NODE JS
# See https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
#====================================
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash \
    && apt-get install -y nodejs

#====================================
# BOWER, GRUNT, GULP
#====================================

RUN npm install --global grunt-cli@1.3.1 bower@1.8.4 gulp@4.0.0

#==========
# Jenkins slave
#==========
# Copy the entrypoint
ADD contrib/bin/* /usr/local/bin/
WORKDIR /home/jenkins
USER jenkins

# Run the Jenkins JNLP client
ENTRYPOINT ["/usr/local/bin/run-jnlp-client"]