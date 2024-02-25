import sys, menu, pickle
from ReadChat import ReadChat
from ClientConnect import ClientConnect
from threading import Thread
from gui.tk import gui
from Algo.pbkdf2 import ImplPbkdf2
from Algo import merkle, DiffieHellman, helper, assinaturaDigital, key, rsa

def ServerConnect(client, ReadChat):
    while True:       
        menu.MainMenu()
        choice = input()
        
        if choice == "1":
            menu.HashingChouse()
            hash = input()
            passwrd = input("Insira a password: ")
            pbk = ImplPbkdf2(passwrd, hash).generate_key(passwrd, hash)
            client.send(("PBKDF2," + str(pbk)).encode("utf-8"))
            
        elif choice == "2":
            client.send(("DiffieHellman").encode('utf-8'))
            MyPB = str(DiffieHellman.public_key(ReadChat.getPrivateKey()))
            client.send(MyPB.encode('utf-8'))
            PublicKey = client.getSocket().recv(1000024)

            gui("300x300", "Diff").open(str(DiffieHellman.secury_key(int(PublicKey.decode('utf-8')), ReadChat.getPrivateKey())), comand=None)
            
        elif choice == "3":
            menu.MerkleEncryptChouse()
            tipo = input()
            N = int(input("Quantidade de segredos que pretende criar: "))
            if tipo == "1":
                client.send(str("Merkle Puzzles,1," + str(N)).encode("utf-8"))
                client.send(pickle.dumps(merkle.AliceAES(N)))
                
            elif tipo == "2":
                client.send(str("Merkle Puzzles,2," + str(N)).encode("utf-8"))
                client.send(pickle.dumps(merkle.AliceARC4(N)))
            else:
                print("Criptografia não conhecida")

        elif choice == "4":
            print("Quantidade de bytes para a chave:")
            chave = rsa.gerarKeys(int(input()))
            client.send(("RSA|" + str(chave)).encode("utf-8"))
        
        elif choice == "5":
            client.send(("Pre-Distribuidas").encode('utf-8'))
            MyPB = str(DiffieHellman.public_key(ReadChat.getPrivateKey()))
            client.send(MyPB.encode('utf-8'))
            PublicKey = client.getSocket().recv(1000024)
 
            SecondPublicKey = str(DiffieHellman.public_key(int(PublicKey.decode('utf-8'))))
            client.send(SecondPublicKey.encode('utf-8'))
            SecondOtherPublicKey = client.getSocket().recv(1000024)

            gui("300x300", "Diff1").open(str(DiffieHellman.secury_key(int(SecondOtherPublicKey.decode('utf-8')), int(PublicKey.decode('utf-8')))), comand=None)

        elif choice == "6":
            key.CreateKey(4024).write_file("private_key.pem")
            assinaturaDigital.ass(input("Introduza a sua mensagem: "))
            
        elif choice == "7":
            menu.Helper()
            help = input()
            if help == "1":
                helper.HelperPBKDF2()
            elif help == "2":
                helper.HelperDH()
            elif help == "3":
                helper.HelperMerkle()
            elif help == "4":
                helper.HelperRSA()
            elif help == "5":
                helper.HelperCPD()
            elif help == "6":
                helper.HelperAD()
            else:
                print("Opção desconhecida")
                
        elif (choice == "0"): break
        
    client.getSocket().close()

def main():
    #Clean console:
    sys.stdout.write('\033[2J\033[H')
    sys.stdout.flush()
    #++++++++++++++++++++++
    client = ClientConnect(input("🧊 Server IP   -> "), int(input("🚪 Server PORT -> ")))
    rd = ReadChat(client.getSocket(), 1000024, "Client")
    
    thread = Thread(target=ServerConnect, args=(client,rd,))
    thread.start()    
    
main()
