%3a
arqueologo(13210,jose,instituicao).
escavacao(231,porto,cidade).
achado(34242,vaso,porcelana,bom).

%um trablho é identificado pelo codigo do arqueologo se for acima de 10000
%ele trabalha na area da cidade
trabalho(arqueologo(A,_,_),escavacao(_,_,B)) :- A > 10000 =:= cidade, B = A

%um objeto pertence a uma escavação se o objeto tiver o mesmo codigo da escavação
objeto(achado(A,_,_,_),trabalho(arqueologo(_,_,_),escavacao(B,_,_))) :- A = B.