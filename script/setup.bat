@rem init npm 
npm config set proxy http://proxy1.scig.gov.hk:8080
npm config set https-proxy http://proxy1.scig.gov.hk:8080

@rem init git 
git config --local --add http.proxy http://proxy1.scig.gov.hk:8080
git config --local --add https.proxy http://proxy1.scig.gov.hk:8080

