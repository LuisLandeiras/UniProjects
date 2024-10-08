%5a
viatura(frente,muita,pesado).

%5b
preco(viatura(_,A,_)) :- A = muita, A =:= caro.
estabilidade(viatura(A,_,B)) :- A = frente, A =:= estavel; B = ligeiro, B =:= instavel.
travoes(viatura(_,A,B)) :- B = pesado, B =:= bons; A = pouca, A =:= maus.


