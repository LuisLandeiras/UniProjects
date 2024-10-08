%Ex5
boa(arv(R, E, D)) :- boa(E), boa(D), E \= 'v', D \= 'v', E + D = R.

%boa(arv(7,v,v)).