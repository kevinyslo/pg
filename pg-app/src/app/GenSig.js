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

const p12Der = fs.readFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/70256AB07F0B5F76BAC700ADA5392DA263729E9E.p12', {encoding: 'binary'})

const p12Asn1 = forge.asn1.fromDer(p12Der)
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, '2806612841954537')
//console.log('---------', p12)

let bag = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag})[forge.pki.oids.pkcs8ShroudedKeyBag][0]
bag = bag ? bag : p12.getBags({bagType: forge.pki.oids.keyBag})[forge.pki.oids.keyBag][0]
const privateKey = bag.key
console.log('---------Found key:', privateKey)

var md = forge.md.sha1.create();
md.update('sign this', 'utf8');
var signature = privateKey.sign(md);
console.log('--------signature:', signature)

fs.writeFileSync('./pg-app/src/app/keystore/ORG_TRIAL_ONE/sig', signature, {encoding: 'binary'});
