---
title: White Paper - Understanding and Exploiting Zerologon
date created: 2021-01-06
description: "A paper examining the MS-NRPC protocol in detail and walk through how to exploit it."
tags: security, whitepaper, microsoft
---

## Zerologon? What's that?

Zerologon is the cool new vulnerability in town with a CVSS score of 10. It has intrigued me ever since it came out. I have read Secura's original [white paper](https://www.secura.com/blog/zero-logon) on it multiple times and would recommend anyone interested in it to do so too.
The vulnerability lies in Microsoft's Netlogon Remote Protocol, which is used for user and machine authentication in Windows domain controlled networks.

## What is the vulnerability about?

The reason this vulnerability has intrigued me so much is because it stems from an insecure use of AES Cipher Feedback mode of operation. Nonces and IVs are very important for the secure function of cryptographic algorithms, and keeping them random is the only to ensure this security.
However, Microsoft hardcoded the IV in one of the functions in the Netlogon Remote Protocol as zero. This leads to the cryptographic weakness which allows an attacker to bypass authentication.

## Research Paper

Due to my interest in network security and cryptography, I took a challenge to properly understand the working of MS-NRPC, the cryptographic logic behind it, and the vulnerability in it.
After a lot of studying and reading through the Microsoft's documentation, I have finally finished the paper which has been published on [ExploitDB](https://www.exploit-db.com/papers) and [Packet Storm Security](https://packetstormsecurity.com/).

You can find the links to the paper here:

- [**Packet Storm Security**](https://packetstormsecurity.com/files/160823/Understanding-And-Exploiting-Zerologon.html)
- [**ExploitDB**](https://www.exploit-db.com/papers?author=10918)
