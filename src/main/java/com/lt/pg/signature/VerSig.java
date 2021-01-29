package com.lt.pg.signature;

/*
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.util.io.pem.PemReader;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.*;

class VerSig {
    
    public static void main(String[] args) {
        
        /* Verify a DSA signature */
        
//        if (args.length != 3) {
//            System.out.println("Usage: VerSig publickeyfile signaturefile datafile");
//        }
        if (args.length != 0) {
            System.out.println("Usage: VerSig");
        }
        else try{
            
            /* import encoded public key */
            Path path = Paths.get("C:\\Users\\ad_kevin_ys_lo\\project\\pg\\pg-app\\src\\app\\keystore\\ORG_TRIAL_ONE\\pub");
            String pem = new String(Files.readAllBytes(path), Charset.defaultCharset());
    
//            String publicKeyPEM = key
//                    .replace("-----BEGIN CERTIFICATE-----", "")
//                    .replaceAll(System.lineSeparator(), "")
//                    .replace("-----END CERTIFICATE-----", "");
//            byte[] encoded = Base64.decodeBase64(publicKeyPEM);
    
            byte[] encoded;
            PublicKey pubKey;
            try (StringReader reader = new StringReader(pem)) {
                try (PemReader pemReader = new PemReader(reader)) {
                    encoded = pemReader.readPemObject().getContent();
                    CertificateFactory factory = CertificateFactory.getInstance("X.509");
                    X509Certificate cert = (X509Certificate) factory.generateCertificate(new ByteArrayInputStream(encoded));
                    pubKey = cert.getPublicKey();
                }
            }
    
//            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
//            X509EncodedKeySpec pubKeySpec = new X509EncodedKeySpec(encoded);
            
            
//            FileInputStream keyfis = new FileInputStream(args[0]);
//            byte[] encKey = new byte[keyfis.available()];
//            keyfis.read(encKey);
//            
//            keyfis.close();
//            
//            X509EncodedKeySpec pubKeySpec = new X509EncodedKeySpec(encKey);
            
//            KeyFactory keyFactory = KeyFactory.getInstance("DSA", "SUN");
            
            
//            pubKey = keyFactory.generatePublic(pubKeySpec);
            
            /* input the signature bytes */
            FileInputStream sigfis = new FileInputStream("C:\\Users\\ad_kevin_ys_lo\\project\\pg\\pg-app\\src\\app\\keystore\\ORG_TRIAL_ONE\\sig");
            byte[] sigToVerify = new byte[sigfis.available()];
            sigfis.read(sigToVerify );
            
            sigfis.close();
            
            /* create a Signature object and initialize it with the public key */
            Signature sig = Signature.getInstance("SHA256withRSA");
            sig.initVerify(pubKey);
            
            /* Update and verify the data */
            
            FileInputStream datafis = new FileInputStream("C:\\Users\\ad_kevin_ys_lo\\project\\pg\\pg-app\\src\\app\\keystore\\ORG_TRIAL_ONE\\data");
            BufferedInputStream bufin = new BufferedInputStream(datafis);
            
            byte[] buffer = new byte[1024];
            int len;
            while (bufin.available() != 0) {
                len = bufin.read(buffer);
                sig.update(buffer, 0, len);
            };
            
            bufin.close();
            
            
            boolean verifies = sig.verify(sigToVerify);
            
            System.out.println("signature verifies: " + verifies);
            
            
        } catch (Exception e) {
            e.printStackTrace(System.err);
        };
        
    }
    
}


