#!/bin/bash

echo $PATH                                                                                               
while sleep 1; do      
		#The script trap the termination signal and break the while loop so that it will
		#not make current node standby as haproxy closed by reboot/shutdown 
        trap "break;" SIGHUP SIGINT SIGTERM                                                     
        status=$(systemctl status haproxy | grep 'active (running)')                                     
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
done                                                                                                                                                                                          
