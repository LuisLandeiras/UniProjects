const {PythonShell} =require('python-shell');
const DatabaseConnect = require('DBConnection.js')
const db = new DatabaseConnect()
const Area_TableEstado = document.getElementById("Area_TableEstado")
const Area_TableInvesProj = document.getElementById("Area_TableInvesProj")
const Area_TableFinanProj = document.getElementById("Area_TableFinanProj")
const Area_TableFinanProjProg = document.getElementById("Area_TableFinanProjProg")

db.setQuery("SELECT Estado, Data_Inicio, Data_Fim, Nome FROM dbo.Proj")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){ 
    console.log(db.getQuery()) 
    var table
    var col, row
    table = document.createElement('table');
    row = table.insertRow(0)
    col = row.insertCell(0)
    col.innerHTML = "Projeto"
    col = row.insertCell(1)
    col.innerHTML = "Estado"
    col = row.insertCell(2)
    col.innerHTML = "Data de Inicio"
    col = row.insertCell(3)
    col.innerHTML = "Data de Fim"
    res.forEach((Element) =>{
        var Projeto = Element.split(' ')
        console.log(Projeto)
        row = table.insertRow(1);
        col = row.insertCell(0)
        col.innerHTML = Projeto[5] + " " + Projeto[6]
        col = row.insertCell(1)
        col.innerHTML = Projeto[0]
        col = row.insertCell(2)
        col.innerHTML = Projeto[2]
        col = row.insertCell(3)
        col.innerHTML = Projeto[4]
        Area_TableEstado.appendChild(table);
    })
})

db.setQuery("SELECT I.Nome, Funcao, Tempo_Percen, J.Nome FROM dbo.Proj J, dbo.Investigador I, dbo.Participa P, dbo.Funcao F WHERE P.Id_Proj = J.Id_Proj and P.Id_Inves = I.Id_Inves and P.Id_Funcao = F.Id_Funcao ORDER BY J.Nome")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){ 
    console.log(db.getQuery()) 
    var table
    var col, row
    table = document.createElement('table')
    row = table.insertRow(0)
    col = row.insertCell(0)
    col.innerHTML = "Projeto"
    col = row.insertCell(1)
    col.innerHTML = "Investigador"
    col = row.insertCell(2)
    col.innerHTML = "Função"
    col = row.insertCell(3)
    col.innerHTML = "Tempo(%)"
    res.forEach((Element) =>{
        var InvesPart = Element.split(' ')
        console.log(InvesPart)
        row = table.insertRow(1)
        col = row.insertCell(0)
        col.innerHTML = InvesPart[7] + " " + InvesPart[8]
        col = row.insertCell(1)
        col.innerHTML = InvesPart[0] + " " + InvesPart[1]
        col = row.insertCell(2)
        col.innerHTML = InvesPart[3]
        col = row.insertCell(3)
        col.innerHTML = InvesPart[5]
        Area_TableInvesProj.appendChild(table);
    })
})

db.setQuery("SELECT TOP 5 P.Nome, F.Valor, E.Sigla FROM dbo.Proj P, dbo.Financiamento F, dbo.Entidade E WHERE P.Id_Proj = F.Id_Proj and E.Id_Ent = F.Id_Ent ORDER BY F.Valor")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){ 
    console.log(db.getQuery()) 
    var table
    var col, row
    table = document.createElement('table');
    row = table.insertRow(0); 
    col = row.insertCell(0);
    col.innerHTML = "Projeto";
    col = row.insertCell(1);
    col.innerHTML = "Entidade";
    col = row.insertCell(2);
    col.innerHTML = "Valor";
    res.forEach((Element) =>{
        var array = Element.split(' ')
        row = table.insertRow(1); 
        console.log(row)
        col = row.insertCell(0);
        col.innerHTML = array[0];
        col = row.insertCell(1);
        col.innerHTML = array[4] + " " + array[6];
        col = row.insertCell(2);
        col.innerHTML = array[2] ;
        Area_TableFinanProj.appendChild(table);
    })
})

db.setQuery("SELECT E.Sigla, D.Valor, G.Nome, P.Nome FROM dbo.Proj P, dbo.ProgFinanciamento F, dbo.Entidade E, dbo.Doa D, dbo.Prog G WHERE E.Id_Ent = D.Id_Ent and D.Id_Prog = G.Id_Prog and F.Id_Prog = G.Id_Prog and F.Id_Proj = P.Id_Proj ORDER BY D.Valor")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){ 
    console.log(db.getQuery()) 
    var col, row
    var table
    table = document.createElement('table');
    row = table.insertRow(0);
    col = row.insertCell(0)
    col.innerHTML = "Projeto"
    col = row.insertCell(1)
    col.innerHTML = "Programa"
    col = row.insertCell(2)
    col.innerHTML = "Entidade"
    col = row.insertCell(3)
    col.innerHTML = "Valor"
    
    res.forEach((Element) =>{
        var array = Element.split(' ')
        row = table.insertRow(1)
        col = row.insertCell(0)
        col.innerHTML = array[6] + " " + array[7]
        col = row.insertCell(1)
        col.innerHTML = array[4]
        col = row.insertCell(2)
        col.innerHTML = array[0]
        col = row.insertCell(3)
        col.innerHTML = array[2]
        Area_TableFinanProjProg.appendChild(table)
    })
})