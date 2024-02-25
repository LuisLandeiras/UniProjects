import random
from Crypto.Cipher import AES
from Crypto.Cipher import ARC4

msgs = []
keys = []
secrets = []

s = 25      #len(secret)
n = 64      #len(msg)

#-------------------- AES -----------------------
def AliceAES(Num):      
    for i in range(0, Num):
        secret = str(random.randint(1000000000000000000000000, 9999999999999999999999999))
        key = str(random.randint(1000, 9999))
        enc_suite = AES.new((key*4).encode('utf-8'), AES.MODE_CBC, (key*4).encode('utf-8'))
        msg = enc_suite.encrypt(('0'*(n-s-5) + secret + "|" + key).encode('utf-8'))
        msgs.append(msg)
        keys.append(key)
        secrets.append(secret)
    return msgs

def BobAES(num1, arrmsg):   
    decrypted_msg = b''
    rand_msg_solve = num1
    while decrypted_msg.find(('0'*(n-s-5)).encode('utf-8')) != 0:
        key = str(random.randint(1000, 9999))
        dec_suite = AES.new((key*4).encode('utf-8'), AES.MODE_CBC, (key*4).encode('utf-8'))
        decrypted_msg = dec_suite.decrypt(arrmsg[rand_msg_solve])
    return decrypted_msg[(n-s):].decode('utf-8')
#------------------------------------------------

#------------------ ARC4 ---------------------
def AliceARC4(Num):
    for i in range(Num):
        secret = str(random.randint(1000000000000000000000000, 9999999999999999999999999))
        key = str(random.randint(1000, 9999))
        cipher = ARC4.new(key.encode('utf-8'))
        msg = cipher.encrypt(('0'*(n-s-5) + secret + "|" + key).encode('utf-8'))
        msgs.append(msg)
        keys.append(key)
        secrets.append(secret)
    return msgs
def BobARC4(num1, arrmsg):
    decrypted_msg = b''
    rand_msg_solve = num1
    while decrypted_msg.find(('0'*(n-s-5)).encode('utf-8')) != 0:
        key = str(random.randint(1000, 9999))
        cipher = ARC4.new(key.encode('utf-8'))
        decrypted_msg = cipher.decrypt(arrmsg[rand_msg_solve])
    return decrypted_msg[(n-s):].decode('utf-8')
#------------------------------------------------