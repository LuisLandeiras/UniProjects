#include <stdio.h>
#include <stdlib.h>

#include "Aleatorio.h"
#include "OperacoesPrimariasB.h"
#include "ListasLigadasSimples.h"
#include "ListasExerciciosB.h"

int NumElemIntervaloA(PNodo L, float N[]){
    PNodo P = L;
    int count = 0;

    while(P != NULL){
        if(P->Elemento.altura >= N[0] && P->Elemento.altura <= N[1]){
            count++;
        }
        P = P->Prox;
    }

    return count;
}

int NumElemNascidosA(PNodo L, int K){
    PNodo P = L;
    int count = 0;

    while(P != NULL){
        if(P->Elemento.dataNasc[2] == K){
            count++;
        }
        P = P->Prox;
    }

    return count;
}

PNodo RemoverNElem(PNodo L, int N){
    PNodo P = L;

    while(P != NULL && N > 0){
        N--;
        P = P->Prox;
    }

    return P;
}

PNodo Array[2];
PNodo * DividirGeneroEmListas(PNodo L){
    PNodo C = criarLista();
    PNodo P = criarLista();

    while (L != NULL){
        if(L->Elemento.genero == 0){
            C = inserirListaFim(L->Elemento, C);
        }else{
            P = inserirListaFim(L->Elemento, P);
        }
        L = L->Prox;
    }
    
    Array[0] = C;
    Array[1] = P;

    return Array;
}

int main(){
    PNodo Lista;
    int TAM, scan, scan1;
    float Array[2];

    // B1.1
    TAM = gerarNumeroInteiro(13, 13);
    printf("TAM = %d\n\n", TAM);
    Lista = criarListaAleatoria(TAM);
    printf("\nLista Normal:\n\n");
    mostrarListaInicio(Lista);  

    // B1.2 
    printf("\nLista ItoF:\n\n");
    mostrarListaInicio(Lista);
    printf("\nLista FtoI:\n\n");
    mostrarListaFimRec(Lista);
    
    // B1.3
    for (int i = 0; i < 2; i++){
        printf("\nInsira um valor de altura:\n");
        scanf("%f", &Array[i]);
    }
    printf("Numero de elementos no intervalo: %d\n", NumElemIntervaloA(Lista, Array));
    
    // B1.4
    printf("\nInsira um ano:\n");
    scanf("%d", &scan);
    printf("\nNumero de elementos no intervalo: %d\n", NumElemNascidosA(Lista, scan));

    // B1.5
    printf("\nInsira um valor:\n");
    scanf("%d", &scan);
    printf("\nLista Nova:\n\n");
    mostrarListaInicio(RemoverNElem(Lista, scan));
    

    // B1.6
    PNodo* array = (PNodo*) malloc(2);
    array = DividirGeneroEmListas(Lista);
    printf("\nNova Lista:\n\n");
    for(int i = 0; i < 2; i++){
      mostrarListaInicio(array[i]);
    }
   
    return 0;
}