import socket

class ClientConnect:
    def __init__(self, ServerIP, ServerPort):
        self.ServerIP = ServerIP
        self.ServerPort = ServerPort
        try:
            self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.client_socket.connect((ServerIP, ServerPort))
        except:
            print("Err to connect server ❌")
            exit()
    
    def getSocket(self):         return self.client_socket
    def send(self, msg):         return self.client_socket.send(msg)