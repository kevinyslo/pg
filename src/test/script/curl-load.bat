@ECHO OFF
@rem Test jms connectionfactory max pool size
@rem For Atomikos, runtime check AtomikosConnectionFactoryBean
@rem Test db datasource max pool size
@rem For Atomikos, runtime check AtomikosDataSoureBean
set i=1
:start
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"test%i%\",\"password\":\"test%i%\",\"enabled\":true}" "http://localhost:8082/api/app/user"
set /a "i=%i%+1"
echo Wait 10 sec to send ...
timeout /t 10 /nobreak > NUL
goto start
