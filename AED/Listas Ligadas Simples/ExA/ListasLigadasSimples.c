
PNodo criarNodo(INFO X){
  PNodo P;
  P = (PNodo) malloc(sizeof(struct Nodo));
  if (P == NULL)
    return NULL;
  P->Elemento = X;
  P->Prox = NULL;
  return P;
}

PNodo libertarNodo(PNodo P){
  P->Prox = NULL;
  free(P);
  P = NULL;
  return P;
}

PNodo criarLista(){
  PNodo L;
  L = NULL;
  return L;
}

int listaVazia(PNodo L){
  if (L == NULL)
    return 1;
  else
    return 0;
}

void mostrarListaInicio(PNodo L){
  PNodo P = L;
  while (P != NULL){
    mostrarElemento(P->Elemento);
    P = P->Prox;
  }
  printf("\n\n");
}

void mostrarListaInicioRec(PNodo L){
  if (L != NULL){
    mostrarElemento(L->Elemento);
    mostrarListaInicioRec(L->Prox);
  }
}

void mostrarListaFimRec(PNodo L){
  if (L != NULL){
    mostrarListaFimRec(L->Prox);
    mostrarElemento(L->Elemento);
  }
}

int tamanhoLista(PNodo L){
  int  tam = 0; 
  while (L != NULL){
    tam++;
    L = L->Prox;
  } 
  return tam;
}

int tamanhoListaRec(PNodo L){ 
  if (L == NULL) 
    return 0; 
  else 
    return 1 + tamanhoListaRec(L->Prox);
}

int pesquisarLista(INFO X, PNodo L){ 
  while (L != NULL && compararElementos(L->Elemento, X) != 0)
    L = L->Prox;
  if (L == NULL)
    return 0;
  else
    return 1;
} 

int pesquisarListaRec(INFO X, PNodo L){
  if (L == NULL) 
    return  0;
  if (compararElementos(L->Elemento, X) == 0) 
    return  1; 
  return pesquisarListaRec(X, L->Prox);
}

// X está na lista L
// devolve NULL se X está no inicio da lista
PNodo procurarAntecessor(INFO X, PNodo L){
  PNodo  Ant;
  if (compararElementos(L->Elemento, X) == 0)
    return NULL;
  Ant = L; 
  while (compararElementos(Ant->Prox->Elemento, X) != 0)
    Ant = Ant->Prox;
  return Ant;
}

// X está na lista L
// devolve NULL se X está no inicio da lista
PNodo procurarAntecessorRec(INFO X, PNodo L){ 
  if (compararElementos(L->Elemento, X) == 0) 
    return  NULL;   //  só acontece se X estiver no início de L 
  if (compararElementos(L->Prox->Elemento, X) == 0) 
    return  L; 
  return procurarAntecessorRec(X, L->Prox);
}

PNodo inserirListaInicio(INFO X, PNodo L){
  PNodo P;
  P = criarNodo(X);
  if (P == NULL)
    return L;
  P->Prox = L;
  L = P;
  return L;
}

PNodo inserirListaFim(INFO X, PNodo L){ 
  PNodo Ant, P;
  P = criarNodo(X); 
  if (P == NULL) 
    return L; 
  if (L == NULL) // lista vazia, logo X é o único elemento da lista
    return P;
  Ant = L; 
  while (Ant->Prox != NULL)    // marcar o elemento do fim de L
    Ant = Ant->Prox;
  Ant->Prox = P; // ligar último nodo da lista L ao novo nodo (com o X)
  return  L;
}

// assume-se que a lista está ordenada por ordem crescente
PNodo procurarAntecessorOrdem(INFO X, PNodo L){ 
  PNodo Ant = NULL; 
  while (L != NULL && compararElementos(L->Elemento, X) < 0){
    Ant = L;
    L = L->Prox;
  } 
  return Ant; 
} 

PNodo inserirListaOrdem(INFO X, PNodo L){
  PNodo P, Ant;
  P = criarNodo(X); 
  if (P == NULL) 
    return  L; 
  if (L == NULL) 
    return  P;    // a lista L inicia-se em P
  Ant = procurarAntecessorOrdem(X, L); 
  if (Ant == NULL){   // inserir no início de L
    P->Prox = L; 
    return  P;
  }   
  P->Prox = Ant->Prox;
  Ant->Prox = P;
  return  L; 
}

// remover X da lista L, em que X está na lista
PNodo removerLista(INFO X, PNodo L){ 
  PNodo P, Ant;
  Ant = procurarAntecessor(X, L); 
  if (Ant == NULL){   // remover elemento do início de L
    P = L;
    L = L->Prox;
  } 
  else{
    P = Ant->Prox;
    Ant->Prox = P->Prox; // ou (= Ant->Prox)->Prox
  } 
  P = libertarNodo(P); 
  return  L;
}

// atualiza os dados do elemento da lista que tem a chave de X
void atualizarLista(INFO X, PNodo L){
  PNodo PAux = L;
  while (PAux != NULL && compararElementos(PAux->Elemento, X) != 0)
    PAux = PAux->Prox;
  if (PAux != NULL)  //  existe um elemento com a chave de X
    PAux->Elemento = X;
}

// liberta todos os nodos da lista, devolvendo-a vazia
PNodo libertarLista(PNodo L){
  PNodo P;
  while (L != NULL){
    P = L;
    L = L->Prox;
    P = libertarNodo(P);
  }
  return  L;
}


