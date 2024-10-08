%Exercicio 1
solucao(0) :-
    inicial(X),
    busca([[X]], S),
    inverter(S,SI),
    write(SI).

busca([Caminho|_], Solucao) :- atingemeta(Caminho), !, Solucao = Caminho.
busca([Caminho|Lista], Solucao) :-
    findall(UMAEXT, estende(Caminho, UMAEXT), EXT),
    concatenar(EXT, Lista, Lista1),
    busca(Lista1, Solucao).

estende([EstadoA|Caminho], [EstadoB, EstadoA|Caminho]) :-
    oper(EstadoA, EstadoB),
    naorepete(EstadoB, Caminho).

atingemeta([E|_]) :- meta(E).

naorepete(E, C) :- not(member(E, C)).

oper([M1,C1,0,M2,C2], [M1n,C1,1,M2n,C2]) :- M1 >= 2, M1n is M1 - 2, M2n is M2 + 2, seguro(M1n, C1), seguro(M2n, C2).
oper([M1,C1,1,M2,C2], [M1n,C1,0,M2n,C2]) :- M2 >= 2, M1n is M1 + 2, M2n is M2 - 2, seguro(M1n, C1), seguro(M2n, C2).
oper([M1,C1,0,M2,C2], [M1,C1n,1,M2,C2n]) :- C1 >= 2, C1n is C1 - 2, C2n is C2 + 2, seguro(M1, C1n), seguro(M2, C2n).
oper([M1,C1,1,M2,C2], [M1,C1n,0,M2,C2n]) :- C2 >= 2, C1n is C1 + 2, C2n is C2 - 2, seguro(M1, C1n), seguro(M2, C2n).
oper([M1,C1,0,M2,C2], [M1n,C1n,1,M2n,C2n]) :- M1 >= 1, C1 >= 1, M1n is M1 - 1, C1n is C1 - 1, M2n is M2 + 1, C2n is C2 + 1, seguro(M1n, C1n), seguro(M2n, C2n).
oper([M1,C1,1,M2,C2], [M1n,C1n,0,M2n,C2n]) :- M2 >= 1, C2 >= 1, M1n is M1 + 1, C1n is C1 + 1, M2n is M2 - 1, C2n is C2 - 1, seguro(M1n, C1n), seguro(M2n, C2n).
oper([M1,C1,0,M2,C2], [M1n,C1,1,M2n,C2])  :- M1 >= 1, M1n is M1 - 1, M2n is M2 + 1, seguro(M1n, C1), seguro(M2n, C2).
oper([M1,C1,1,M2,C2], [M1n,C1,0,M2n,C2])  :- M2 >= 1, M1n is M1 + 1, M2n is M2 - 1, seguro(M1n, C1), seguro(M2n, C2).
oper([M1,C1,0,M2,C2], [M1,C1n,1,M2,C2n])  :- C1 >= 1, C1n is C1 - 1, C2n is C2 + 1, seguro(M1, C1n), seguro(M2, C2n).
oper([M1,C1,1,M2,C2], [M1,C1n,0,M2,C2n])  :- C2 >= 1, C1n is C1 + 1, C2n is C2 - 1, seguro(M1, C1n), seguro(M2, C2n).

seguro(M, C) :- M >= C; M = 0.

inicial([3,3,0,0,0]).
meta([0,0,_,3,3]).

concatenar([],X,X).
concatenar([A|B],C,[A|D]) :- concatenar(B,C,D).

inverter(L, LI) :- inverter_aux(L, [], LI).
inverter_aux([], Aux, Aux).
inverter_aux([H|T], Aux, LI) :- inverter_aux(T, [H|Aux], LI).

%solucao(0).
%Cada valor da lista representa um passo dado no problema
%sende o inicio da lista o problema inicial e o final o problema resolvido
%Resultado: [3, 3, 0, 0, 0], [3, 1, 1, 0, 2], [3, 2, 0, 0, 1], [3, 0, 1, 0, 3], [3, 1, 0, 0, 2], [1, 1, 1, 2, 2], [2, 2, 0, 1, 1], [0, 2, 1, 3, 1], [0, 3, 0, 3, 0], [0, 1, 1, 3, 2], [1, 1, 0, 2, 2], [0, 0, 1, 3, 3]]
