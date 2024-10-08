%8a
aluno(jose,15,masculino).
aluno(maria,16,feminino).
aluno(manuel,15,masculino).
aluno(matilde,15,feminino).

%8b


%8c
%a - aluno(A,_,_)
%b - aluno(maria,A,_)
%c - aluno(_,_,masculino)
%d - 
%e -
%idade(A) :- aluno(A,B,_), B < 20.
% idade(_).
