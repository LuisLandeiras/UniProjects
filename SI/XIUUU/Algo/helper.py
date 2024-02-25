def HelperMerkle():
    print("Puzzles Merkle:\n"
         "\tCliente que envia inputs:\n"
         "\t\t- Quantidade de segredos que quer enviar, isto é, número de segredos aleatorios que vão ser criados e enviados para o cliente que irá receber os puzzles;\n"
         "\t\t- Tipo de criptografia que pretende utilizar, sendo AES uma criptografia por blocos e ARC4 uma criptografia de algoritmo simétrico.\n"
         "\tCliente que recebe puzzles:\n"
         "\t\t- Escolhe aleatoriamente um valor entre 1 e a quantidade criada pelo outro utilizador;\n"
         "\t\t- É usado brute force para decifrar o segredo escolhido ficando assim com a chave revelada para troca de mensagens cifradas.\n"
         )
    
def HelperDH():
    print("Diffie-Hellman:\n"
         "\t- Os dois clientes fazem a geração de uma fache publica baseados na chave privadas de cada um.\n"
         "\t- As chaves publicas são trocadas entre eles, e são geradas as chaves secretas, baseadas na chaves privadas individuais e a chave publica do outro cliente.\n"
         "\t- No fim é aberto uma janela em cada cliente mostrando a chave secreta.\n"
        )
    
def HelperPBKDF2():
    print("PBKDF2:\n"
         "\tCliente que envia inputs:\n"
         "\t\t- Insere a password que pretende cifrar;\n"
         "\t\t- Seleciona o tipo de cifra para a password colocada.\n"
         "\tCliente que receb o PBKDF:\n"
         "\t\tRecebe a nova password.\n"   
        )
    
def HelperRSA():
    print("RSA:\n"
         "\tCliente que envia a chave:\n"
         "\t\t- Quantidade de bits dos números primos (Valores maiores geram chaves mais fortes);\n"
         "\t\t- Gera a chave pública e a privada e envia a chave pública.\n"
         "\tCliente que recebe a chave:\n"
         "\t\tRecebe a chave publica do cliente"
        )
    
def HelperCPD():
    print("Chaves Pré-Distribuídas:\n"
          "\t- Os dois clientes geram uma chave publica e enviam para o outro cliente."
          "\t- Depois da chave publica recebida é gerada outra chave publica que é enviada."
          "\t- A primeira chave publica recebida é utilizada como chave privada e a segunda publica recebida e utilizada como chave publica."
          "\t- Após isso é aplicado o algoritmo de Diffie-Hellman."
        )
    
def HelperAD():
    print("Assinaturas Digitais:\n"
          "\t- O cliente insere a mensagem que pretende assinar." 
          "\t- Após isto a mensagem é devidamente assinada." 
        )
