
#include <stdio.h>
#include <stdlib.h>

#include "Aleatorio.h"
#include "OperacoesPrimariasA.h"
#include "ListasLigadasSimples.h"
#include "ListasExerciciosA.h"

// A1.3
float TotalPag(PNodo L, int N){
  float soma = 0;
  PNodo P = L;

  while(P != NULL){
    if(P->Elemento.NIF == N){
      soma = soma + P->Elemento.Pagamento;
    }
    P = P->Prox;
  }
  return soma;
}

// A1.4
int QuantPag(PNodo L, float  Pag){
  int count = 0;
  PNodo P = L;

  while(P != NULL){
    if(P->Elemento.Pagamento >= Pag){
      count = count + 1;
    }
    P = P->Prox;
  }
  return count;
}

// A1.4
int QuantPagRec(PNodo L, float Pag){
  int k;

  if(L == NULL){
    return 0;
  }

  k = QuantPagRec(L->Prox, Pag);
  if(L->Elemento.Pagamento >= Pag){
    return k + 1;
  }else{
    return k;
  }
}

// A1.5
float MaiorPag(PNodo L){
  float Pag = 0;
  PNodo P = L;

  while(P != NULL){
    if(P->Elemento.Pagamento >= Pag){
      Pag = P->Elemento.Pagamento;
    }
    P = P->Prox;
  }
  return Pag;
}

// A1.6
float MenorPag(PNodo L, float K){
  PNodo P = L;
  float aux = 1001;
  while(P->Prox != NULL){
    if(P->Prox->Elemento.Pagamento >= K && P->Prox->Elemento.Pagamento < aux){
      aux = P->Prox->Elemento.Pagamento;
    }
    P = P->Prox;
  }
  return aux;
}

// A1.7
PNodo RemoverElem(PNodo L, int K){
  PNodo P = L;

  while(P != NULL){
    if(P->Elemento.NFatura == K){
      L = removerLista(P->Elemento, L);
      break;
    } else{
      P = P->Prox;
    } 
  }
  return L;
}

// A1.8
PNodo RemoverElemPagMenor(PNodo L){
  float Pag = MaiorPag(L);
  PNodo P = L;
 
  while (P != NULL){
    if(P->Elemento.Pagamento == Pag){
      PNodo C = P;
      C->Prox = NULL;
      return C;
    }    
    P = P->Prox;
  }
}

// A1.9
PNodo RemoverNif(PNodo L, int K){
  PNodo P = L;
  PNodo C = NULL;

  while(P != NULL){
    if(P->Elemento.NIF != K){
      /*if (C == NULL){
        C = criarNodo(P->Elemento);
      } else{
        C = inserirListaFim(P->Elemento, C);
      }*/
      (C == NULL) ? (C = criarNodo(P->Elemento)) : (C = inserirListaFim(P->Elemento, C));
    } 
    P = P->Prox;
  }
  return C;
}

// A1.10
PNodo RemoverNElem(PNodo L, int K){
  /*
  PNodo P = L;
  PNodo C = criarLista();

  while(P != NULL){
    if(K != 0){
      C = inserirListaFim(P->Elemento, C);
    }
    K--;
    P = P->Prox;
  }
  return C;
  */

  PNodo P = NULL;
  while (L != NULL && K < 0){
    P = L->Prox;
    free(L);
    K--;
  }
  return P;
}

// A1.10
PNodo RemoverNElemRec(PNodo L, int K){
  if (K == 0 || L == NULL){
    return L;
  }else{
    PNodo P=L->Prox;
    free(L);
    return RemoverNElemRec(P, K - 1);
  }
}

// A1.11
PNodo Array[2];
PNodo * DividirLista(PNodo L, int N){
  PNodo P = L;
  PNodo C = criarLista();

  while(P->Elemento.NFatura != N){
    C = inserirListaFim(P->Elemento, C); //Primeira parte da lista
    P = P->Prox; //Segunda parte da lista
  }

  Array[0] = C;
  Array[1] = P;

  return Array;
}

// A1.12
PNodo OrdenarCrescenteNIF(PNodo L){
  PNodo P = L;
  PNodo C = criarLista();
  int aux = 0, menor = 200000;

  for (int i = 0; i < tamanhoLista(L); i++){
    while (P != NULL){
      if (P->Elemento.NIF < menor && P->Elemento.NIF > aux){
        menor = P->Elemento.NIF;
      }   
      P = P->Prox;
    }
    P = L;
    while (P != NULL){
      if (P->Elemento.NIF == menor){
        C = inserirListaFim(P->Elemento, C);
      } 
      P = P->Prox;
    }
    aux = menor;
    P = L;
    menor = 200000;
  }

  return C;
}

// A1.13
PNodo RemoverNNif(PNodo L, int K){
  PNodo P = L;

  return OrdenarCrescenteNIF(RemoverNif(P, K));
}

// A1.14
PNodo RemoverNIFMaiorN(PNodo L, int K){
  PNodo P = L;
  PNodo C = criarLista();

  while(P != NULL){
    if(P->Elemento.NIF < K){
      C = inserirListaFim(P->Elemento, C);
    }
    P = P->Prox;
  }

  return OrdenarCrescenteNIF(C);
}

// A1.15
int NumPagBetween(PNodo L, float K1, float K2){
  PNodo P = L;
  int count = 0;

  while(P != NULL){
    if(P->Elemento.Pagamento >= K1 && P->Elemento.Pagamento <= K2){
      count++;
    }
    P = P->Prox;
  }

  return count;
}

// A1.16
PNodo Array1[2];
PNodo * AcrescentarPag(PNodo L, float K1, float K2){
  PNodo P = L;
  PNodo C = criarLista(), V = criarLista();

  for (int i = 0; i < tamanhoLista(L); i++){
    if(i < tamanhoLista(P)/2){
      P->Elemento.Pagamento = K1 + P->Elemento.Pagamento;
      C = inserirListaFim(P->Elemento, C);
    }else{
      P->Elemento.Pagamento = K2 + P->Elemento.Pagamento;
      V = inserirListaFim(P->Elemento, V);
    }
    P = P->Prox;
  }
  
  Array1[0] = C;
  Array1[1] = V;

  return Array1;
}

// A1.17
PNodo AcrescentarPagNElem(PNodo L, float Y1, float Y2, int K){
  PNodo P = L;
  int i = 0;

  while(P != NULL){
    if(i < K || i + K >= tamanhoLista(L)){
      P->Elemento.Pagamento = P->Elemento.Pagamento + Y1;
    }else{
      P->Elemento.Pagamento = P->Elemento.Pagamento + Y2;
    }
    P = P->Prox;
    i++;
  }

  return L;
}

// A1.18
PNodo InfoMaiorPag(PNodo L, float Y){
  PNodo P = L;
  float i = 0;
  PNodo C = NULL;

  while(P != NULL){
    if(P->Elemento.Pagamento > i && P->Elemento.Pagamento < Y){
      i = P->Elemento.Pagamento;
      C = inserirListaInicio(P->Elemento, C);
      C->Prox = NULL;
    }
    P = P->Prox;
  }

  return C;
}

// A1.19
PNodo InfoPag(PNodo L){
  PNodo C = InfoMaiorPag(L, MaiorPag(L));  
  
  return C;
}

// A1.20
PNodo RemoverFirstNLast(PNodo L){
  PNodo P = L;
  PNodo C = criarLista();
  int i = 0;

  while (L != NULL){
    if(i > 0 && i < tamanhoLista(P) - 1){
      printf("%d\n", i);
      C = inserirListaFim(L->Elemento, C);
    }
    L = L->Prox;
    i++;
  }
  
  return C;
}

// A1.21
PNodo RemoverElemMeio(PNodo L){
  PNodo P = L;
  PNodo C = criarLista();
  int i = 0;

  while (L != NULL){
    if(i == 0 || i == tamanhoLista(P) - 1){
      printf("%d\n", i);
      C = inserirListaFim(L->Elemento, C);
    }
    L = L->Prox;
    i++;
  }
  
  return C;
}

// A1.22
PNodo LastNode(PNodo L){  
  return (L->Prox == NULL) ? L : LastNode(L->Prox);
}
PNodo MoveElem(PNodo L){
  PNodo P = L;
  PNodo Node3rd = L->Prox->Prox;
  INFO LastElem = LastNode(L)->Elemento;
  P = removerLista(LastElem, P);
  P->Prox = criarNodo(LastElem);
  P->Prox->Prox = Node3rd;

  return P;
}

// A1.23
PNodo LimparLista(PNodo L){
  PNodo P = L;
  P = libertarLista(P);

  return P;
}

// A1.24
PNodo InverterLista(PNodo L){
  PNodo P = criarLista();

  while(L != NULL){
    P = inserirListaInicio(L->Elemento, P);
    L = L->Prox;
  }

  return P;
}

// A1.25
PNodo RemoverElemN(PNodo L, int N){
  PNodo P = L;
  int i = 0;

  while (P != NULL){
    if(i == N){
      L = removerLista(P->Elemento, L);
    }
    P = P->Prox;
    i++;
  }
  
  return L;
}

// A1.26
PNodo OrdenarCrescenteFatura(PNodo L){
  PNodo P = L;
  PNodo C = criarLista();
  int aux = 0, menor = 200000;

  for (int i = 0; i < tamanhoLista(L); i++){
    while (P != NULL){
      if (P->Elemento.NFatura < menor && P->Elemento.NFatura > aux){
        menor = P->Elemento.NFatura;
      }   
      P = P->Prox;
    }
    P = L;
    while (P != NULL){
      if (P->Elemento.NFatura == menor){
        C = inserirListaFim(P->Elemento, C);
      } 
      P = P->Prox;
    }
    aux = menor;
    P = L;
    menor = 200000;
  }

  return C;
}
PNodo JuntarListasOrdNFatura(PNodo L1, PNodo L2){
  PNodo P = criarLista();

  while (L1 != NULL){
    P = inserirListaFim(L1->Elemento, P);
    L1 = L1->Prox;
  }
  while (L2 != NULL){
    P = inserirListaFim(L2->Elemento, P);
    L2 = L2->Prox;
  }

  return OrdenarCrescenteFatura(P);
}

// TP1.0
int NumMesIgualN(PNodo L, int N){
  int count = 0;

  while(L != NULL){
    if(L->Elemento.Data[1] == N){
      count++;
    }
    L = L->Prox;
  }

  return count;
}

int main(){
  
  PNodo Lista, Lista1;
  int TAM, scan, scan1, scan2;
  
  // A1.1
  TAM = gerarNumeroInteiro(13, 13);
  printf("TAM = %d\n\n", TAM);
  Lista = criarListaAleatoria(TAM);
  Lista1 = criarListaAleatoria(TAM);
  
  // A1.2 
  printf("\nLista Normal:\n\n");
  mostrarListaInicio(Lista);

  printf("\nLista Normal:\n\n");
  mostrarListaInicio(Lista1);
  
  printf("\nLista Invertida:\n\n");
  mostrarListaFimRec(Lista);

  // A1.3
  printf("\nInsira um NIF:\n");
  scanf("%d", &scan);
  printf("%f\n", TotalPag(Lista, scan));

  // A1.4
  printf("\nInsira um valor de pagamento:\n");
  scanf("%d", &scan);
  printf("Interativa -> %d\t Recursiva -> %d\n", QuantPag(Lista, scan), QuantPagRec(Lista, scan));

  // A1.5
  printf("\nMaior valor de pagamento:\n");
  printf("%f\n", MaiorPag(Lista));

  // A1.6
  printf("\nInsira um valor de pagamento:\n");
  scanf("%d", &scan);
  printf("%f\n", MenorPag(Lista, scan));

  // A1.7
  printf("\nInsira um numero de fatura:\n");
  scanf("%d", &scan);
  printf("Nova Lista:\n\n");
  mostrarListaInicio(RemoverElem(Lista, scan));
  
  // A1.8
  printf("Nova Lista:\n\n");
  mostrarListaInicio(RemoverElemPagMenor(Lista));
  
  // A1.9
  printf("\nInsira um NIF:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverNif(Lista, scan));
  
  // A1.10
  printf("\nInsira o numero de elementos iniciais que pretende remover:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverNElem1(Lista, scan));

  // A1.11
  PNodo* array = (PNodo*) malloc(2);
  printf("\nInsira o numero:\n");
  scanf("%d", &scan);
  array = DividirLista(Lista, scan);
  printf("\nNova Lista:\n\n");
  for(int i = 0; i < 2; i++){
    mostrarListaInicio(array[i]);
  }
  
  // A1.12
  printf("\nNova Lista Ordenada Por Ordem Crescente:\n\n");
  mostrarListaInicio(OrdenarCrescenteNIF(Lista));
  
  // A1.13
  printf("\nInsira o numero do NIF:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverNNif(Lista, scan));

  // A1.14
  printf("\nInsira o numero do NIF:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverNIFMaiorN(Lista, scan));

  // A1.15
  printf("\nInsira o numero:\n");
  scanf("%d", &scan);
  printf("\nInsira o numero:\n");
  scanf("%d", &scan1);
  printf("\nValor: %d\n", NumPagBetween(Lista, scan, scan1));
  
  // A1.16
  PNodo* array = (PNodo*) malloc(2);
  printf("\nInsira o numero:\n");
  scanf("%d", &scan);
  printf("\nInsira o numero:\n");
  scanf("%d", &scan1);
  array = AcrescentarPag(Lista, scan, scan1);
  printf("\nNova Lista:\n\n");
  for(int i = 0; i < 2; i++){
    mostrarListaInicio(array[i]);
  }
  
  // A1.17
  printf("\nInsira o Y1:\n");
  scanf("%d", &scan);
  printf("\nInsira o Y2:\n");
  scanf("%d", &scan1);
  printf("\nInsira o K:\n");
  scanf("%d", &scan2);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(AcrescentarPagNElem(Lista, scan, scan1, scan2));
  
  // A1.18
  printf("\nInsira o Y:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(InfoMaiorPag(Lista, scan));
  
  // A1.19
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(InfoPag(Lista));

  // A1.20
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverFirstNLast(Lista));
  
  // A1.21
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverElemMeio(Lista));

  // A1.22
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(MoveElem(Lista));

  // A1.23
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(LimparLista(Lista));

  // A1.24
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(InverterLista(Lista));

  // A1.25
  printf("\nInsira o N:\n");
  scanf("%d", &scan);
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(RemoverElemN(Lista, scan));

  // A1.26
  printf("\nNova Lista:\n\n");
  mostrarListaInicio(JuntarListasOrdNFatura(Lista, Lista1));
  
  // TP1.0
  printf("\nInsira o N:\n");
  scanf("%d", &scan);
  printf("\nNumero de meses iguais: %d\n", NumMesIgualN(Lista, scan));
  
  // TP2.1
  PNodo TPLista;
  TPLista = criarListaAleatoria(15);

  // TP2.2
  mostrarListaInicio(TPLista);

  // TP2.3
  int M = TPLista->Prox->Elemento.Data[1];
  printf("Mês do segundo elemento da lista: %d\n", M);

  // TP2.4
  int count = 0;
  while (TPLista != NULL){
    if(TPLista->Elemento.Data[1] != M){
      count++;
    }
    TPLista = TPLista->Prox;
  }
  // TP2.5
  printf("%d\n", count);

  return 0;
}
