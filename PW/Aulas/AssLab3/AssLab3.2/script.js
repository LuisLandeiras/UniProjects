let nome = ["Triângulo", "Quadrilátero", "Pentágono", "Hexágono", "Heptágono", "Octágono", "Eneágono", "Decágono"];

function poligono(){
    var valor = document.getElementById("valor").value;
    switch(valor){
        case "3":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[0];
            console.log("Triângulo");
            break;
        case "4":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[1];
            console.log("Quadrilátero");
            break;
        case "5":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[2];
            console.log("Pentágono");
            break;
        case "6":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[3];
            console.log("Hexágono");
            break;
        case "7":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[4];
            console.log("Heptágono");
            break;
        case "8":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[5];
            console.log("Octágono");
            break;
        case "9":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[6];
            console.log("Eneágono");
            break;
        case "10":
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = nome[7];
            console.log("Decágono");
            break;
        default:
            document.getElementById("print").innerHTML = " ";
            document.getElementById("print").innerHTML = "Não existe";
            console.log("Não existe");
    }
}