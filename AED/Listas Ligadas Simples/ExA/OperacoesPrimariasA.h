
typedef struct{
  int   NFatura;
  int   NIF;
  int   Data[3];
  float Pagamento;
}INFO;

void mostrarElemento(INFO);

INFO criarElemento();

// comparação de 2 elementos do tipo INFO, segundo o campo NFatura (chave)
// devolve -1 se primeiro < segundo, 0 se iguais, 1 se primeiro > segundo
int compararElementos(INFO, INFO);


#include "OperacoesPrimariasA.c"
