#!/bin/bash

status=$(systemctl status haproxy | grep 'active (running)')
echo $status >> /root/status.log

echo $PATH

if [ "$status" == "" ]
then
  currentNodeIdStmt=$(crm cluster status | grep 'Local node ID')
  echo $currentNodeIdStmt
  currentNodeId=$(echo ${currentNodeIdStmt:13} | sed 's/^[ \t]*//;s/[ \t]*$//')
  echo $currentNodeId
  onlineStmt=$(crm status -R | grep 'Online')
  echo $onlineStmt
  end=$(echo $onlineStmt | grep -b -o "($currentNodeId)" | cut -d: -f1)
  echo $end
  currentNodeOnline=$(echo ${onlineStmt:(($end-6)):5} | sed 's/^[ \t]*//;s/[ \t]*$//')
  echo $currentNodeOnline
  currentNodeStartedStmt=$(crm status | grep 'Started' | grep $currentNodeOnline)
  echo $currentNodeStartedStmt
  if [ "$currentNodeStartedStmt" != "" ]
  then
    crm node standby $currentNodeOnline
  fi
fi