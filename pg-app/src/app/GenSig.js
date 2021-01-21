const rs = require('jsrsasign');
const rsu = require('jsrsasign-util');
const pem = rsu.readFile(
  './keystore/ORG_TRIAL_ONE/70256AB07F0B5F76BAC700ADA5392DA263729E9E.p12'
);
const prvKey = rs.KEYUTIL.getKey(pem, '2806612841954537');
const sig = new a.Signature({ alg: 'SHA1withRSA' });
sig.init(prvKey);
sig.updateString('aaa');
const sigVal = sig.sign();
console.log('-------------> ', sigVal);
