// const rs = require('jsrsasign');
// const rsu = require('jsrsasign-util');
// const pem = rsu.readFile(
//   './keystore/ORG_TRIAL_ONE/70256AB07F0B5F76BAC700ADA5392DA263729E9E.p12'
// );
// const prvKey = rs.KEYUTIL.getKey(pem, '2806612841954537');
// const sig = new a.Signature({ alg: 'SHA1withRSA' });
// sig.init(prvKey);
// sig.updateString('aaa');
// const sigVal = sig.sign();
// console.log('-------------> ', sigVal);
const forge = require('node-forge')
const fs = require('fs')

// load p12 
const p12Der = fs.readFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/70256AB07F0B5F76BAC700ADA5392DA263729E9E.p12', {encoding: 'binary'})

// private of p12
const p12Asn1 = forge.asn1.fromDer(p12Der)
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '2806612841954537')
//console.log('---------', p12)
let bag = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag})[forge.pki.oids.pkcs8ShroudedKeyBag][0]
bag = bag ? bag : p12.getBags({bagType: forge.pki.oids.keyBag})[forge.pki.oids.keyBag][0]
const privateKey = bag.key
console.log('---------Found key:', privateKey)

// sign md (sha1) by private key and get the binary sig 
var md = forge.md.sha256.create();
const data = 'sign this 我都剛剛同公公傾完電話📞祝大家晚安⭐️🌙'
md.update(data, 'utf8');
fs.writeFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/data', data);
var signature = privateKey.sign(md);
console.log('--------signature:', signature)


// convert binary sig to base64 and save in a file 
let base64data = forge.util.encode64(signature)
// let buff = Buffer.from(signature, 'binary');
// let base64data = buff.toString('base64');
console.log('---------- base64data: ', base64data)
// fs.writeFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/sig', signature, {encoding: 'binary'});
fs.writeFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/sig', base64data);


// verify by sig from base64
const bags = p12.getBags({ bagType: forge.pki.oids.certBag })
const cert = bags[forge.pki.oids.certBag][0]['cert']
const publicKey = cert.publicKey
const newSig = forge.util.decode64(base64data)
// buff = Buffer.from(base64data, 'base64')
// const newSig = buff.toString('binary')
var md = forge.md.sha256.create();
md.update('sign this 我都剛剛同公公傾完電話📞祝大家晚安⭐️🌙', 'utf8');
var verified = publicKey.verify(md.digest().bytes(), newSig);
console.log('---------- verified: ', verified)
const pem = forge.pki.certificateToPem(cert) 
fs.writeFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/pub', pem);
