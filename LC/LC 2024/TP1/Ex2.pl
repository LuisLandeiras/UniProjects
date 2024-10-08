%2a
progenitor(jose,joao).
progenitor(maria,joao).
progenitor(jose,ana).
progenitor(maria,ana).
progenitor(ana,helena).
progenitor(ana,joana).
progenitor(joao,mario).
progenitor(helena,carlos).
progenitor(mario,carlos).

%2b
feminino(maria).
feminino(ana).
feminino(helena).
feminino(joana).

masculino(jose).
masculino(mario).
masculino(joao).
masculino(carlos).

irma(A,B) :- progenitor(C,A), progenitor(C,B), feminino(A).
irmao(A,B) :- progenitor(C,A), progenitor(C,B), masculino(A).

descendente(A,C) :- progenitor(A,B), progenitor(B,C).

mae(A,B) :- progenitor(A,B), feminino(A).
pai(A,B) :- progenitor(A,B), masculino(A).

avo(A,C) :- progenitor(A,B), progenitor(B,C), masculino(A).

tio(A,C) :- progenitor(X,C), irmao(A,X).

primo(A,C) :- progenitor(X,A), progenitor(Z,C), irmao(X,Z); progenitor(X,A), progenitor(Z,C), irma(X,Z).

%2c
%a - progenitor(jose,joao).
%b - progenitor(maria,A).
%c - primo(mario,A).
%d - 
%e - 
%f - irma(helena,_).