
void mostrarElemento(INFO X){
  printf("%d - ", X.NCC);
  printf("%2d/%2d/%4d - ", X.dataNasc[0], X.dataNasc[1], X.dataNasc[2]);
  printf("%2f - ", X.altura);
  printf("%d\n",  X.genero);
}

INFO criarElemento(){
  INFO X;
  X.NCC = gerarNumeroInteiro(10000, 90000);
  X.genero = gerarNumeroInteiro(0, 1);
  X.dataNasc[2] = gerarNumeroInteiro(1950, 2022);
  X.dataNasc[1] = gerarNumeroInteiro(1, 12);
  if(X.dataNasc[1] == 2)
    X.dataNasc[0] = gerarNumeroInteiro(1, 28);
  else
    if (X.dataNasc[1] == 4 || X.dataNasc[1] == 6 || X.dataNasc[1] == 9 || X.dataNasc[1] == 11)
      X.dataNasc[0] = gerarNumeroInteiro(1, 30);
    else
      X.dataNasc[0] = gerarNumeroInteiro(1, 31);
  X.altura = gerarNumeroReal(0.50, 1.90);
  return X;
}

// comparação de 2 elementos do tipo INFO, segundo o campo NFatura (chave)
//   devolve -1 se X < Y, 0 se X = Y, 1 se X > Y
int compararElementos(INFO X, INFO Y){
  if (X.NCC > Y.NCC)
    return 1;
  if (X.NCC < Y.NCC)
    return -1;
  return 0;
}



