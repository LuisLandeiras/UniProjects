
typedef struct{
  int NCC;
  int dataNasc[3];
  float altura;
  int genero;
}INFO;

void mostrarElemento(INFO);

INFO criarElemento();

// comparação de 2 elementos do tipo INFO, segundo o campo NFatura (chave)
// devolve -1 se primeiro < segundo, 0 se iguais, 1 se primeiro > segundo
int compararElementos(INFO, INFO);


#include "OperacoesPrimariasB.c"
