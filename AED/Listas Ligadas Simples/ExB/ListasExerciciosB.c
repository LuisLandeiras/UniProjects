
PNodo criarListaAleatoria(int N){
    int k;
    PNodo L;
    INFO X;

    L = criarLista();
    for (int k = 0; k < N; k++){
        X = criarElemento();
        L = inserirListaInicio(X, L);
    }

    return L;
    
}

