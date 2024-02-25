let catchphrase = ["Ay Caramba!", "D'Oh!", "Avengers Assemble!", "Hulk Smash!"];

function quote(){
    var bart = document.getElementById("bart");
    var homer = document.getElementById("homer");
    var captain = document.getElementById("captain");
    var hulk = document.getElementById("hulk");
    
    if(bart.checked){
        document.getElementById("print").innerHTML = " ";
        document.getElementById("print").innerHTML = document.getElementById("print").innerHTML + catchphrase[0];
        console.log("Ay Caramba!");
    }
    if(homer.checked){
        document.getElementById("print").innerHTML = " ";
        document.getElementById("print").innerHTML = document.getElementById("print").innerHTML + catchphrase[1];
        console.log("D'Oh!");
    }
    if(captain.checked){
        document.getElementById("print").innerHTML = " ";
        document.getElementById("print").innerHTML = document.getElementById("print").innerHTML + catchphrase[2];
        console.log("Avengers Assemble!");
    }
    if(hulk.checked){
        document.getElementById("print").innerHTML = " ";
        document.getElementById("print").innerHTML = document.getElementById("print").innerHTML + catchphrase[3];
        console.log("Hulk Smash!");
    }
}