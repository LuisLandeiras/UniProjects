from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

class CreateKey():
    def __init__(self, size):
        self.private_Key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=size,
            backend=default_backend()
        )
        self.private_Key_bytes = self.private_Key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
    
    def get_private_key(selft, DataType):
        if (DataType != int and DataType != str): return None
        if (DataType == int): return selft.private_Key.private_numbers().d
        private_key_str =  selft.private_Key_bytes.decode('utf-8').split('\n')[1:-2]
        private_key_str = ''.join(private_key_str)
        return private_key_str
    
    def write_file(selft, filename):
        with open(filename, 'wb') as f:
            f.write(selft.private_Key_bytes)