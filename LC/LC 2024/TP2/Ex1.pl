%Ex1
participar([H|T],N,[_],[_]) :- H < N, participar(T,N,[_|H],_);H >= N, participar(T,N,_,[_|H]).

%participar([1,2,3,4],2,A,B).