%Exercicio 2
solucao(N,S) :-
	crialista(N,L),
	criasup(N,DS),
	criainf(N,DI),
	resolve(S,L,L,DS,DI),
    lerLista(N,S).

lerLista(_,[]) :- !.
lerLista(N,[_|X]) :- lerLista(N,X).

apaga(X,[X|Y],Y).
apaga(A,[B|C],[B|D]) :- apaga(A,C,D).

resolve([],[],_,_,_).
resolve([C|LC],[L|LL],C0,DS,DI):-
	apaga(C,C0,C01),
	NS is L - C,
	NI is L + C,
	apaga(NS,DS,DS1),
	apaga(NI,DI,DI1),
	resolve(LC,LL,C01,DS1,DI1).

criasup(N,L) :- A is 1-N, B is N-1, findall(X,(between(A,B,X)),L).
criainf(N,L) :- A is 2*N, findall(X,(between(2,A,X)),L).

crialista(N,[N|L]) :- N > 0, N1 is N-1, crialista(N1,L).
crialista(0,[]).

%1ª input: tamanho do tabuleiro a utilizar
%2ª input: Lista onde será dado o resultado
%solucao(8,A).
%Cada valor da lista representa a coluna onde cada rainha se encontra 
%sendo o seu index a respetiva linha
%Resultado: A = [8, 4, 1, 3, 6, 2, 7, 5]