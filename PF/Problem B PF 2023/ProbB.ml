let n = (Scanf.sscanf (read_line ()) "%d" (fun n -> n))
let m = (Scanf.sscanf (read_line ()) "%d" (fun m -> m))

(*
  parray: recebe o preço de cada fatia sendo o index a quantidade da fatia;
  taray: será guardado no respetivo index da fatia o preço mais optimizado.   
*)
let parray = Array.make (n + 1) 0
let tarray = Array.make (n + 1) 0

(*
  teste: 
    recebe de input um inteiro que será a condição de paragem e que indica a posição onde se encontra no array;
    calcula o preço mais optimizado para cada fatia disponibilizada na tabela dada com input;
    devolve como output o optimalarray em que cada posição do array tem o valor mais optimizado da fatia, sendo a última posição do array o resultado pretendido.
*)
let rec teste index =
  if index <= n then
    (
     let maior = ref 0 in
     for k=0 to index do
       let a = parray.(k) + tarray.(index-k) in
       if a > !maior then maior := a;
     done;
     tarray.(index) <- !maior;
     teste (index+1)
    )

let () = 
  for i = 0 to (m-1) do
    let b,a = Scanf.sscanf (read_line ()) "%d %d" (fun a b -> a,b) in
    parray.(b) <- a; 
  done;

  teste 0;

  print_int(tarray.(n));
  print_newline()
