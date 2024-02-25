import base64
import hashlib
import secrets
import hmac
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2  # Rename the class
from Crypto.Random import get_random_bytes

class ImplPbkdf2:
    def __init__(self, pass_phrase, hash_chosen):
        self.salt = self.get_salt()
        self.count = 10024
        self.key = self.generate_key(pass_phrase, hash_chosen)
        self.iv = None

    def generate_key(self, pass_phrase, hash_chosen):

        hash_functions = {
            '1': hashlib.sha1,
            '2': hashlib.sha224,
            '3': hashlib.sha256,
            '4': hashlib.sha384,
            '5': hashlib.sha512
        }

        hash_func = hash_functions[hash_chosen]

        derived_key = PBKDF2(
            pass_phrase.encode("utf-8"),
            self.salt,
            dkLen=32,
            count=self.count,
            prf=lambda p, s: hmac.new(p, s, hash_func).digest()
        )
        return derived_key

    #def encrypt(self, data):
    #    cipher = AES.new(self.key, AES.MODE_CBC)
    #    self.iv = cipher.iv
    #    encrypted_data = cipher.encrypt(self.pad_data(data))
    #    base64_encrypted_data = base64.b64encode(encrypted_data).decode('utf-8')
    #    return base64_encrypted_data
#
    #def pad_data(self, data):
    #    block_size = AES.block_size
    #    padding_size = block_size - len(data) % block_size
    #    padding = bytes([padding_size] * padding_size)
    #    return data + padding

    @staticmethod
    def get_salt():
        return secrets.token_hex(16)