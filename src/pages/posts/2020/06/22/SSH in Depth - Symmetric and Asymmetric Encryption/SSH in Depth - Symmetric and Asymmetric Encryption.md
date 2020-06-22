---
title: SSH in Depth - Symmetric and Asymmetric Encryption
date: 2020-06-22
tags:
- Web
- Internet history
layout: layout
---

Security is one of the battlegrounds of the modern web. Safe exchange of data between two or more parties without exposing it to the others has always been a Holy Grail of any kind of human activity that requires some level of confidentiality. Since the ancint times, our predecessors tried to keep the information out of the keen eyes of their rivals. The struggle continues, especially with the tools such as **SSH** that allow us to connect to another computer all the way across the globe. There are two main approaches to data encryption: symmetric and asymmetric encryption, the latter being a corner stone of the modern informatics. To understand their importance, it's also necessary to grasp the main advantages and drawbacks of both. 

## Symmetric encryption

Let us have a look at Caesar's Cipher, one of the most famous encryption systems, often shown as an example of the most basic cryptography. It's mechanism is drop-dead simple: for each letter, find one that is shifted a given number of letters down the alphabet. The number representing a shift becomes a **key** to your message. Say we want to encrypt word like "ABC" with a shift of three letters: A becomes D, B becomes E, C becomes F. Our encrypted message, "DEF" looks nothing like the original one. The recepient needs to know the shift number in order to decrypt the original text. Obviously, Caesar's Cipher is an extremely simple encryption method and it is easy to break even for the first-graders by a sheer brute force attack - just try to shift the message by some random number of letters until you find something that looks like the original text.

Why does it matters in information technology of 21st century? Well, Caesar's Cipher is something we would call a **symmetric encryption**. The access to the readable message is both protected and guaranteed by the access to the **key** by both parties of the exchange. Technically, secret key can take any of the forms - a word, sentence, number, floating point number, a picture. Literally, whatever information can be used to encrypt plaintext message. The main issue with symmetric encryption system is this: Caesar sending classified information to Brutus is obliged to provide him with the beforehand, otherwise the recepient will not be able to understand the message. 

Fast forward to modern times and the problem still remains - it is possible to manually move the file representing the file (key) between two computers to make them understand the messages that are to be exchanged. We can do it physically, by connecting them or transferring the file via USB key (secure but tedious) or just send the file through the network (way less secure but more easy to do: think email, any IM communicator, FTP etc.).

You have probably already guessed the main issue that eats this system: the necessity of propagation of a private key through each conversation participant. The risk of getting your data breached rises with each new device having an access to the secret key. That means it can simply fall into the wrong hands and the whole whole exchange will be accessible to whoever owns the key. 

What would be the solution for such problem? One of the early cryptography best practices was frequent changing of the key. But that just made hacking the message slightly more tedious, but absolutely not impossible. This state of encryption lasted until the 1970s and, among other dramatic events, made Germans lose their Enigma-encrypted war plans during the Second World War.

## Asymmetric encryption

In 1976 Whitfield Diffie and Martin Hellman came up with the paper called [New Directions in Cryptography](https://ee.stanford.edu/~hellman/publications/24.pdf) in which they have described an example of asymmetric encryption - called ever since a Diffie-Hellman exchange. It was a first practical use of a private-public key encryption.

What are the principles behind this system?

In asymmetric encryption instead of just one private key, we use a pair of keys: public and private one. Public key can be accessible to anyone who wants to communicate with its owner, private key stays private and should not be disseminated. 

So, how does assymetric encryption exchange actually works? Let's walk through the process where Bob tries to send an encrypted message, like "Hello", to Alice:

1. Bob uses his private key to encrypt the message.
2. Bob encrypts his private key, with Alice's public key (that is accessible to anyone)
3. The message gets transmitted (e.g. via network)
4. Alice receives encrypted message and uses her private key to decode Bob's private key - it was encoded with her public key which is linked to her private key!
5. Alice uses Bob's private key to decrypt the message

This scheme misses one important part of the puzzle - how is it possible for Alice to decode Bob's private key? The answer is, private keys are always used to generate public ones. That is why we are talking about a **key pair**: a public key is dependendent on the private one and can be decrypted using some algorithm (such as Ed25519 or RSA, but this a subject for another blog post).

Public key encryption is used widely in many areas, such as Secure Shell (SSH), Transport Layer Security (TLS), email encryption, End-To-End (E2E) encryption in communicators or blockchain. It is one of the most crucial concepts used in the modern information technology and due to this fact it is very susceptible to various attacks.

Public key provides one more feature that can't be neglected: it can authenticate the sender. In the scenario above Alice can make sure that the message is coming from Bob, and not from his evil twin brother Chris, for instance, if Bob adds a digital signature on the message. To do so, Bob would use his private key. Alice then, upon the reception of the message, would check Bob's private key and compute the same digital signature code - an ultimate confirmation of message's authencity. 

## Wrap-up

Symmetric and assymmetric encryption are equally efficient when it comes to keeping the information off the hands of the random onlookers, hackers or enemies of the state, whatever you name them. Though, only the latter guarantees the minimum level of security in the world of modern Internet. Obviously, there are many drawbacks to public key encryption, such as the possibility of calculating the secret key when the algorithm used to generate public key is not strong enough, possibility of man-in-the-middle attacks or problems arising from the public-key-infrastructure design. Asymmetric encryption remains, nonetheless, the base model for many network encryption schemes, including SSH.

