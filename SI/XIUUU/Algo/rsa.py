from Crypto.Util import number

Private=(0,0)

def gerarKeys(NA):
    global Private
    p = number.getPrime(NA)
    q = number.getPrime(NA)
    while p==q:
        q=number.getPrime(NA)

    n = p * q
    phi = (p - 1) * (q - 1)

    e=number.getPrime(NA-(NA//4))
    while e % phi == 0:
        e=number.getPrime(NA-(NA//4))

    d = pow(e,-1,phi)
    Private=(d,n)
    return (e,n)
