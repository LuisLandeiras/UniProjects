%1a
pais_capital(portugal,lisboa).
pais_capital(espanha,madrid).
pais_capital(frança,paris).

%1b
capital(A,B) :- pais_capital(A,B). 

%1ca
%pais_capital(portugal,A).

%1cb
%pais_capital(A,_).

%1cd
%pais_capital(A,paris).