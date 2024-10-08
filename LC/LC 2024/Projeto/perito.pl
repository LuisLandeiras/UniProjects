:- dynamic pc/1, cpu/1, gpu/1, ram/1, motherboard/1, psu/1, disco/1.
:- dynamic cores/1, threads/1, velocidade/1, socket/1, consumo/1, vram/1, tamanho/1.
:- dynamic memoria/1, geracao/1, tipo/1, potencia/1, qualidade/1, preco/1.

perito() :-
    write('Menu'), nl,
    esperaOrdens(_).

esperaOrdens(VV) :-
    mostraComandos(VV),
    write('> '),
    read(Comando),
    executa(VV, Comando).

mostraComandos(_) :-
    write('Comandos disponiveis (introduza o numero 1, 2, 3 ou 4):'), nl,
    write('1 - Consultar uma Base de Conhecimento (BC)'), nl,
    write('2 - Encontrar Computador'), nl,
    write('3 - Procurar Componente'), nl,
    write('4 - Sair'), nl.

executa(_, 1) :-
    write('Nome da BC: '),
    read(F),
    consult(F),
    write('BC consultada com sucesso.'), nl,
    esperaOrdens(_).
executa(_, 2) :- 
    encontrar_computador,
    esperaOrdens(_).    
executa(_, 3) :- 
    procurar_componente,
    esperaOrdens(_).
executa(_, 4) :-
    nl,
    write('Volte Sempre!'), nl,
    halt.
executa(VV, X) :-
    write(X), write(' nao e um comando valido!'), nl,
    esperaOrdens(VV).

encontrar_computador :-
    write('Digite as especificações do computador que deseja encontrar:'), nl,
    write('CPU cores (ou "any" para qualquer): '), read(Cores),
    write('CPU threads (ou "any" para qualquer): '), read(Threads),
    write('CPU velocidade (ou "any" para qualquer): '), read(Velocidade),
    write('CPU socket (ou "any" para qualquer): '), read(Socket),
    write('CPU consumo (ou "any" para qualquer): '), read(Consumo),
    write('GPU vram (ou "any" para qualquer): '), read(Vram),
    write('GPU velocidade (ou "any" para qualquer): '), read(VelocidadeGPU),
    write('GPU consumo (ou "any" para qualquer): '), read(ConsumoGPU),
    write('RAM velocidade (ou "any" para qualquer): '), read(VelocidadeRAM),
    write('RAM memoria (ou "any" para qualquer): '), read(MemoriaRAM),
    write('RAM geracao (ou "any" para qualquer): '), read(GeracaoRAM),
    write('Motherboard socket (ou "any" para qualquer): '), read(SocketMB),
    write('Motherboard tamanho (ou "any" para qualquer): '), read(TamanhoMB),
    write('PSU potencia (ou "any" para qualquer): '), read(PotenciaPSU),
    write('PSU qualidade (ou "any" para qualquer): '), read(QualidadePSU),
    write('Disco tamanho (ou "any" para qualquer): '), read(MemoriaDisco),
    write('Disco tipo (ou "any" para qualquer): '), read(TipoDisco),
    
    findall(Nome, 
        (
            pc(Nome, CPU, GPU, RAM, MOTHERBOARD, PSU, DISCO, _),
            (cpu(CPU,CCores,CThreads,CVelocidade,CSocket,CConsumo)),
            (gpu(GPU,GVram,GVelocidadeGPU,GConsumoGPU)),
            (ram(RAM,RVelocidadeRAM,RMemoriaRAM,RGeracaoRAM)),
            (motherboard(MOTHERBOARD,MSocketMB,MTamanhoMB)),
            (psu(PSU,PPotenciaPSU,PQualidadePSU)),
            (disco(DISCO, DMemoria, DTipo)),
            (Cores == any ; CCores == Cores),
            (Threads == any ; CThreads == Threads),
            (Velocidade == any ; CVelocidade == Velocidade),
            (Socket == any ; CSocket == Socket),
            (Consumo == any ; CConsumo == Consumo),
            (Vram == any ; GVram == Vram),
            (VelocidadeGPU == any ; GVelocidadeGPU == VelocidadeGPU),
            (ConsumoGPU == any ; GConsumoGPU == ConsumoGPU),
            (VelocidadeRAM == any ; RVelocidadeRAM == VelocidadeRAM),
            (MemoriaRAM == any ; RMemoriaRAM == MemoriaRAM),
            (GeracaoRAM == any ; RGeracaoRAM == GeracaoRAM),
            (SocketMB == any ; MSocketMB == SocketMB),
            (TamanhoMB == any ; MTamanhoMB == TamanhoMB),
            (PotenciaPSU == any ; PPotenciaPSU == PotenciaPSU),
            (QualidadePSU == any ; PQualidadePSU == QualidadePSU),
            (MemoriaDisco == any ; DMemoria == MemoriaDisco),
            (TipoDisco == any ; DTipo == TipoDisco)
        ), 
        PCs),
    
    (PCs = [] ->
        write('Computador nao encontrado.'), nl;
        write('Computadores encontrados: '), nl, write(PCs), nl).

procurar_componente :-
    write('Que tipo de componente deseja procurar? (cpu, gpu, ram, motherboard, psu, disco): '), nl,
    read(Tipo),
    (Tipo == cpu -> procurar_cpu;
     Tipo == gpu -> procurar_gpu;
     Tipo == ram -> procurar_ram;
     Tipo == motherboard -> procurar_motherboard;
     Tipo == psu -> procurar_psu;
     Tipo == disco -> procurar_disco;
     write('Tipo de componente invalido.'), nl).

procurar_cpu :-
    write('Digite as especificações da CPU que deseja encontrar:'), nl,
    write('Cores (ou "any" para qualquer): '), read(Cores),
    write('Threads (ou "any" para qualquer): '), read(Threads),
    write('Velocidade (ou "any" para qualquer): '), read(Velocidade),
    write('Socket (ou "any" para qualquer): '), read(Socket),
    write('Consumo (ou "any" para qualquer): '), read(Consumo),
    findall(Name,(
                    cpu(Name, Cor, Thre, Vel, Sock, Cons),
                    (Velocidade == any ; Vel == Velocidade),
                    (Cores == any ; Cores == Cor),
                    (Socket == any ; Sock == Socket),
                    (Consumo == any ; Cons == Consumo),
                    (Threads == any ; Thre == Threads)
                ),
            CPUs),
    (CPUs = [] ->
        write('CPU nao encontrada.'), nl;
        write('CPUs encontradas: '), nl, write(CPUs), nl).

procurar_gpu :-
    write('Digite as especificações da GPU que deseja encontrar:'), nl,
    write('VRAM (ou "any" para qualquer): '), read(Vram),
    write('Velocidade (ou "any" para qualquer): '), read(Velocidade),
    write('Consumo (ou "any" para qualquer): '), read(Consumo),
    findall(Name,(
                    gpu(Name, Viram, Vel, Cons),
                    (Vram == any ; Vram  == Viram),
                    (Velocidade == any ; Vel == Velocidade),
                    (Consumo == any ; Cons == Consumo)
                ),
            GPUs),
    (GPUs = [] ->
        write('GPU nao encontrada.'), nl;
        write('GPUs encontradas: '), nl, write(GPUs), nl).

procurar_ram :-
    write('Digite as especificações da RAM que deseja encontrar:'), nl,
    write('Velocidade (ou "any" para qualquer): '), read(Velocidade),
    write('Memoria (ou "any" para qualquer): '), read(Memoria),
    write('Geracao (ou "any" para qualquer): '), read(Geracao),
    findall(Name,(
                    ram(Name, Vel, Mem, Gen),
                    (Velocidade == any ; Vel == Velocidade),
                    (Memoria == any ; Mem == Memoria),
                    (Geracao == any ; Gen == Geracao)
                ),
            RAMs),
    (RAMs = [] ->
        write('RAM nao encontrada.'), nl;
        write('RAMs encontradas: '), nl, write(RAMs), nl).

procurar_motherboard :-
    write('Digite as especificações da Motherboard que deseja encontrar:'), nl,
    write('Socket (ou "any" para qualquer): '), read(Socket),
    write('Tamanho (ou "any" para qualquer): '), read(Tamanho),
    findall(Name,(
                    motherboard(Name, Sock, Tam),
                    (Socket == any ; Socket == Sock),
                    (Tamanho == any ; Tamanho == Tam)
                ),
            MOTRS),
    (MOTRS = [] ->
        write('MotherBoards nao encontradas.'), nl;
        write('MotherBoards encontradas: '), nl, write(MOTRS), nl).

procurar_psu :-
    write('Digite as especificações da PSU que deseja encontrar:'), nl,
    write('Potencia (ou "any" para qualquer): '), read(Potencia),
    write('Qualidade (ou "any" para qualquer): '), read(Qualidade),
    
    findall(Name,(
                    psu(Name, Pot, Qua),
                    (Potencia == any ; Pot == Potencia),
                    (Qualidade == any ; Qua == Qualidade)
                ),
            PSUs),
    (PSUs = [] ->
        write('PSU nao encontrada.'), nl;
        write('PSUs encontradas: '), nl, write(PSUs), nl).

procurar_disco :-
    write('Digite as especificações do Disco que deseja encontrar:'), nl,
    write('Memoria (ou "any" para qualquer): '), read(Memoria),
    write('Tipo (ou "any" para qualquer): '), read(Tipo),
    
    findall(Name,(
                    disco(Name, Mem, Type),
                    (Memoria == any ; Mem == Memoria),
                    (Tipo == any ; Tipo == Type)
                ),
            Discos),
    (Discos = [] ->
        write('Discos nao encontrada.'), nl;
        write('Discos encontradas: '), nl, write(Discos), nl).