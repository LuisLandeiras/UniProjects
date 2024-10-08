%Ex6
equivalente(arv(R,E,D),[]) :- equivalente(E,[R,[E,D]]), equivalente(D,[R,[E|D]]).

%equivalente(arv(7,arv(2,v,v),arv(5,v,v)),A).
