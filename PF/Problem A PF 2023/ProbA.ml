open Z

let zero = Z.zero
let one = Z.one 
let two = Z.of_int 2
let three = Z.of_int 3

let ( ++ ) = Z.add
let ( -- ) = Z.sub
let ( // ) = Z.div
let ( ** ) = Z.mul 

(*
Função criada de forma recursiva para resolver a sequência de motzkin
Recebe como argumento 4 variáveis:
n = número de sequência que se pretende calcular;
x, y = recebem inicialmente os valores iniciais da sequência (1), sendo depois alterado o valor do x para o ultimo valor do y.
O y é alterado para o novo valor da sequêcia a ser calculado;
aux = usada para comparar com n para se saber se o número máximo pretendido da sequência ja foi obtido.
*)
let rec motzkin n x y aux = 
  if (n ++ Z.of_int 1) == aux then -y else motzkin n y (((two ** aux ++ one) ** y ++ (three ** aux -- three) ** x)//(aux ++ two)) (aux ++ Z.of_int 1)

let intinho = read_int()

let () =  
  print_string (Z.to_string (motzkin (Z.of_int intinho) one one zero));
  print_newline();

    
      
