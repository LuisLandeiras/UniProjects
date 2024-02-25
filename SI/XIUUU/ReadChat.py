import threading, pickle, socket
from gui.tk import gui
from tkinter import *
from Algo.key import CreateKey
from Algo import DiffieHellman, merkle


def ServerSend(graph, ServerResponse, tipo):
    if tipo == "1":
        num = int(graph.getValue(graph.getEntry()))
        print(graph.getValue(graph.getEntry()))
        print ("AES decrypted secret: " + merkle.BobAES(num, pickle.loads(ServerResponse)))
    elif tipo == "2":
        num = int(graph.getValue(graph.getEntry()))
        print(graph.getValue(graph.getEntry()))
        print ("ARC4 decrypted secret: " + merkle.BobARC4(num, pickle.loads(ServerResponse)))

class ReadChat(threading.Thread):
    def __init__(self, serverconnect, ByteSize, Interaction):
        self.connect = serverconnect
        self.ByteSize = ByteSize
        self.ResponseNumber = 0
        self.Interaction = Interaction
        self.execute = True
        threading.Thread.__init__(self)
        self.start()
        self.PrivateKey = CreateKey(4024).get_private_key(int)
    
    def run(self):
        while True:            
            try:
                server_response = self.connect.recv(self.ByteSize)
                self.ResponseNumber += 1
                self.Interaction = "Server"
                try:
                    msg = pickle.loads(server_response)
                    msg = msg.decode('utf-8')
                except:
                    msg = server_response.decode('utf-8')
                if (msg.find("PBKDF2") != -1):
                    print("Chave PBKDF2: "  + msg.split(",")[1])
                    
                    print("Press ENTER to continue...")
                    
                elif (msg.find("DiffieHellman") != -1):
                    OtherPubliKey = self.connect.recv(self.ByteSize)

                    self.connect.send(str(DiffieHellman.public_key(self.PrivateKey)).encode('utf-8'))
                    self.connect.send(str(DiffieHellman.public_key(self.PrivateKey)).encode('utf-8'))
                                 
                    gui("300x300", "Diff").open(str(DiffieHellman.secury_key(int(OtherPubliKey.decode('utf-8')), self.PrivateKey)), comand=None)
                    
                    print("Press ENTER to continue...")
                    
                elif (msg.find("Merkle Puzzles") != -1):
                    N = msg.split(",")[2]
                    tipo = msg.split(",")[1]
                    graph = gui("300x300", "Merkle Puzzle")
                    graph.open("Escolha um valor entre 1-" + N,comand=lambda: ServerSend(graph, self.connect.recv(self.ByteSize), tipo))
                    
                    print("Press ENTER to continue...")

                elif (msg.find("RSA") != -1):
                    print("Chave RSA:" + msg.split("|")[1])
                    print("Press ENTER to continue...")
                    
                elif (msg.find("Pre-Distribuidas") != -1):
                    OtherPubliKey = self.connect.recv(self.ByteSize)

                    self.connect.send(str(DiffieHellman.public_key(self.PrivateKey)).encode('utf-8'))
                    self.connect.send(str(DiffieHellman.public_key(self.PrivateKey)).encode('utf-8'))

                    SecondPublicKey = str(DiffieHellman.public_key(int(OtherPubliKey.decode('utf-8'))))
                    OtherSecondPublicKey = self.connect.recv(self.ByteSize)
                    
                    self.connect.send(SecondPublicKey.encode("utf-8"))
                    gui("300x300", "DiffRead").open(str(DiffieHellman.secury_key(int(OtherSecondPublicKey.decode('utf-8')), int(OtherPubliKey.decode('utf-8')))), comand=None)
                    self.connect.send(SecondPublicKey.encode("utf-8"))
                    
                    print("Press ENTER to continue...")
        
            except socket.error as e:
                print("crash")
                print(repr(e))
                break
            
    def getResponseNumber(self):    return self.ResponseNumber
    def getInteraction(self):       return self.Interaction
    def getPrivateKey(self):        return self.PrivateKey