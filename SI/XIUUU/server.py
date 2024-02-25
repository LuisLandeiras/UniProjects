import sys
import socket
from threading import Thread

server_ip, port = '192.168.1.218', 3000 #PUT YOU IP HERE
ConnectList = []

def SendMSG(connect):
    try:
        data = connect.recv(1000024)
        if (len(ConnectList) == 1): ConnectList[0].send(b"You are alone")
        else:
            for i in range(len(ConnectList)):
                if (ConnectList[i] != connect): ConnectList[i].send(data)
        SendMSG(connect)
    except:
        print("Err ❌\nProbably the client disconnected")
        ConnectList.remove(connect)
                
def main():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((server_ip, port))
    
    server_socket.listen(1)
    #Clean console:
    sys.stdout.write('\033[2J\033[H')
    sys.stdout.flush()
    #++++++++++++++++++++++
    print('Server TCP on ✅')

    while True:
        connect, ip_client = server_socket.accept()
        if len(ConnectList) < 2:
            print("Client connect 🔗")
            ConnectList.append(connect)
            thread = Thread(target=SendMSG, args=(connect,))
            thread.start()
    
main()        