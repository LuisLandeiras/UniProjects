function area(a){
    return Math.floor(Math.PI * a * a);
}
function areaciclo(){
    for(var i = 2; i <= 10; i++){
        console.log(area(i));
    }
}
function calcarea(){
    let r = document.getElementById("radius").value;
    document.getElementById("resultado").innerText = "Área: " + area(r);
}

let list = ["2 -> 12", "3 -> 28", "4 -> 50", "5 -> 78", "6 -> 113", "7 -> 153", "8 -> 201", "9 -> 254", "10 -> 314"];
function text(){ 
    document.getElementById("lista").innerText = "";
    let lista = document.getElementById("lista");
    list.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        lista.appendChild(li);
    });
}