%Ex2
comprimento_par([_|T],N) :- comprimento_par(T,N1), N is N1+1, N mod 2 = 0.
comprimento_impar([_|T],N) :- comprimento_impar(T,N1), N is N1+1, N mod 2 \= 0.

%comprimento_par([1,2],_).
%comprimento_impar([1,2],_).
%comprimento_par([1,2,3],_).
%comprimento_impar([1,2,3],_).
