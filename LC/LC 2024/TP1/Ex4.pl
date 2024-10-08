%4a
parte_de(caixa,computador).
parte_de(placamae,computador).
parte_de(ram,placemae).
parte_de(painel,caixa).
parte_de(butoes,painel).

feito_em(processador,silicio).
feito_em(ram,circuitos).
feito_em(caixa,metal).
feito_em(botoes,plastico).

%4bi
%feito_em(A,M).

%4bii
%feito_em(A,M),M\=plastico,write(A).

%4c
%pertence(X,C) :- parte_de(X,C); parte_de(X,A), parte_de(A,C); parte_de(X,A), parte_de(A,B), parte_de(B,C).