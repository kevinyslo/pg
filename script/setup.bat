@rem init npm 
npm config set proxy http://proxy1.scig.gov.hk:8080
npm config set https-proxy http://proxy1.scig.gov.hk:8080

@rem init git 
git config --global --add http.proxy http://proxy1.scig.gov.hk:8080
git config --global --add https.proxy http://proxy1.scig.gov.hk:8080

