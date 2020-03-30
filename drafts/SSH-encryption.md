#### Encryption

SSH utilises few types of data manipulation that make it impossible (or at
least very, very hard) for the third parties to decrypt the information.

First one is **symmetrical encryption** which allows two users to encrypt and
decrypt an information thanks to a shared secret - a key that can be used by
both parties to understand encrypted information. It means that the key can be
used to encrypt and decrypt the messages that are being sent AND received.  In
practice it means that there's typically one key that is used by both parties
to ensure the security of communication.

How do we obtain such key? The client and server use a **key exchange algorithm** that basically is a series of exchanges between the two parties that results in a key

#TODO:
- Encryption explanation Authentication (password / keys) Integrity check
