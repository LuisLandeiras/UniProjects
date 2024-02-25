open F_parser

let lexmin form =
  if form = "" then 'Z'
  else String.fold_left min(String.get form 0) form

let rec removeBollean str index length =
  if index = length then ""
  else (
    try
      if (String.get str index = 'T' && String.get str (index + 1) = 'R' && String.get str (index + 2) = 'U' && String.get str (index + 3) = 'E') then "" ^ removeBollean str (index + 4) length
      else if (String.get str index = 'F' && String.get str (index + 1) = 'A' && String.get str (index + 2) = 'L' && String.get str (index + 3) = 'S' && String.get str (index + 4) = 'E') then "" ^ removeBollean str (index + 5) length
      else if (String.get str index = ' ' || String.get str index = '(' || String.get str index = ')' || String.get str index = '&' || String.get str index = '|' || String.get str index = '-' || String.get str index = '>' || String.get str index = '<' || String.get str index = '!') then removeBollean str (index + 1) length
      else String.make 1 (String.get str index) ^ removeBollean str (index + 1) length
    with
    | _ -> removeBollean str (index + 1) length
  )

let rec nor formula lex =
  match formula with
    | Var a -> a
    | True -> "(" ^ (nor (False) lex) ^ " % " ^ (nor (False) lex) ^ ")"
    | False -> "(" ^ lex ^ " % " ^ "(" ^ lex ^ " % " ^ lex  ^ ")" ^ ")"
    | Not (Or(x,y)) -> "(" ^ (nor x lex) ^ " % " ^ (nor y lex) ^ ")"
    | Not x -> "(" ^ (nor x lex) ^ " % " ^ (nor x lex) ^ ")"
    | And (x, y) -> "(" ^ "(" ^ (nor x lex) ^ " % " ^ (nor x lex) ^ ")" ^ " % " ^ "(" ^ (nor y lex) ^ " % " ^ (nor y lex) ^ ")" ^ ")"
    | Or (x, y) -> "(" ^ "(" ^ (nor x lex) ^ " % " ^ (nor y lex) ^ ")" ^ " % " ^ "(" ^ (nor x lex) ^ " % " ^ (nor y lex) ^ ")" ^ ")"
    | Implies (x, y) -> (nor (Or (Not x, y)) lex)
    | Equiv (x, y) -> (nor (And (Implies (x, y), Implies (y, x))) lex)

let listp = List.iter (fun x -> Printf.printf "%s\n" (nor (x) ( String.make 1 (lexmin (removeBollean (string_of_formula x) 0 (String.length (string_of_formula x) ) ) )))) (Option.get (parse "stdin"))