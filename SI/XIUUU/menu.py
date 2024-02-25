def MainMenu():
    print("\n================================================================\n")
    print('Menu:')
    print('0 - Sair')
    print('1 - Gerar segredo com PBKDF2')
    print('2 - Trocar segredos com o protocolo de confrimação Diffie-Hellman')
    print('3 - Trocar segredos com Puzzles Merkle ')
    print('4 - Trocar segredos com RSA encryption')
    print('5 - Distribuição de novas chaves de cifra a partir de chaves pré-distribuídas')
    print('6 - Assinatura digital usando o Diffie-Hellman')
    print('7 - Helper')
    print("\n================================================================\n")

def HashingChouse():
    print("Selecione um tipo de hashing:")
    print('1 - Sha1')
    print('2 - Sha224')
    print('3 - Sha256')
    print('4 - Sha384')
    print('5 - Sha512')

def MerkleEncryptChouse():
    print('Escolha o algoritmo: ')
    print('1 - AES')
    print('2 - ARC4')
    
def Helper():
    print('1 - PBKDF2')
    print('2 - Diffie-Hellman')
    print('3 - Merkle Puzzles')
    print('4 - RSA')
    print('5 - Chaves pré-distribuídas')
    print('6 - Assinaturas Digitais')
