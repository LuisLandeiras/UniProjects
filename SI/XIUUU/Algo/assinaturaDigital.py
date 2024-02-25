from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend

def ass(data):
    with open("private_key.pem", "rb") as f:
        private_key_bytes = f.read()
        private_key = load_pem_private_key(private_key_bytes, password=None, backend=default_backend())


    signature = private_key.sign(
        data.encode('utf-8'),
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )

    with open('assinatura.txt', 'w') as file:
        file.write(f"signature: {signature.hex()}")
