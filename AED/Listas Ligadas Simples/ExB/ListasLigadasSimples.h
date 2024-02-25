
struct Nodo{
  INFO   Elemento;
  struct Nodo *Prox;
};

typedef struct Nodo *PNodo;


PNodo criarNodo(INFO);

PNodo libertarNodo(PNodo);

PNodo criarLista();

int listaVazia(PNodo);

void mostrarListaInicio(PNodo);

void mostrarListaInicioRec(PNodo);

void mostrarListaFimRec(PNodo);

int tamanhoLista(PNodo);

int tamanhoListaRec(PNodo);

int pesquisarLista(INFO, PNodo);

int pesquisarListaRec(INFO, PNodo);

// X está na lista L
PNodo procurarAntecessor(INFO, PNodo);

// X está na lista L
PNodo procurarAntecessorRec(INFO, PNodo);

PNodo inserirListaInicio(INFO, PNodo);

PNodo inserirListaFim(INFO, PNodo);

// assume-se que a lista está ordenada por ordem crescente
PNodo procurarAntecessorOrdem(INFO, PNodo);

PNodo inserirListaOrdem(INFO, PNodo);

// remover X da lista L, em que X está na lista
PNodo removerLista(INFO, PNodo);

// atualiza os dados do elemento da lista que tem a chave de X
void atualizarLista(INFO, PNodo);

// liberta todos os nodos da lista, devolvendo-a vazia
PNodo libertarLista(PNodo);


#include "ListasLigadasSimples.c"
