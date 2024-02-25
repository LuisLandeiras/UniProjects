const { PythonShell } = require("python-shell");
const DatabaseConnect = require('DBConnection.js');
const db = new DatabaseConnect()
const Area_Key = document.getElementById('Area_Key')
const Area_Proj = document.getElementById('Area_Proj')
const AltProj = document.getElementById('AltProjSub')
const TProj = document.getElementById("TProj")
const NomeProj = document.getElementById("NomeProj")
const DescriProj = document.getElementById("DescriProj")
const estado = document.getElementById("estado")
const Lingua = document.getElementById("Lingua")
const dinicio = document.getElementById("dinicio")
const dfim = document.getElementById("dfim")
const URL = document.getElementById("URL")
const Doi = document.getElementById("DOI")
const Area_Area = document.getElementById('Area_Area')
const Area_Inves = document.getElementById('Area_Inves')
const Area_Funcao = document.getElementById('Area_Funcao')
var ListRadioProj = [], Proj, ListKey = [], Tempo = [], ListArea = []

db.setQuery("SELECT Id_Proj, Nome FROM dbo.Proj")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var array = r.split(' ')
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = array[0]
        label.form = radio.id
        label.innerText = array[2] + " " + array[3]
        radio.name = 'Proj'
        Area_Proj.appendChild(radio)
        Area_Proj.appendChild(label)
        ListRadioProj.push(radio)
    })
    CheckProj(ListRadioProj)
})

function CheckProj(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
            Proj = Element.id
            if(Element.checked == true){
                db.setQuery("SELECT Estado, Lingua, Data_Inicio, Data_Fim FROM dbo.Proj WHERE Id_Proj =" + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => {
                        var array = Element.split(' ')
                        estado.value = array[0]
                        Lingua.value = array[2]
                        dinicio.value = array[4]
                        dfim.value = array[6]
                    }) 
                })
                db.setQuery("SELECT Descricao FROM dbo.Proj WHERE Id_Proj =" + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => { DescriProj.value = Element }) 
                })
                db.setQuery("SELECT Nome FROM dbo.Proj WHERE Id_Proj =" + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => { NomeProj.value = Element }) 
                })
                db.setQuery("SELECT Titulo FROM dbo.Proj WHERE Id_Proj =" + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => { TProj.value = Element }) 
                })

                
                db.setQuery("SELECT KeyWord FROM dbo.KeyWord K, dbo.Proj P WHERE K.Id_Proj = P.Id_Proj and P.Id_Proj = " + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => {
                        var array = Element.split(' ')
                        var KeyInput = document.createElement('input')
                        var Space = document.createTextNode('\u00A0')
                        KeyInput.type = 'text'
                        KeyInput.value = array[0]
                        Area_Key.appendChild(KeyInput)
                        Area_Key.appendChild(Space)
                        ListKey.push(KeyInput)
                    }) 
                })

                db.setQuery("SELECT Url, Doi FROM dbo.Publi K, dbo.Proj P WHERE K.Id_Proj = P.Id_Proj and P.Id_Proj = " + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => {
                        var array = Element.split(' ')
                        URL.value = array[0]
                        Doi.value = array[2]
                    }) 
                })

                db.setQuery("SELECT A.Nome FROM dbo.Area A, dbo.Dom D, dbo.Proj P WHERE D.Id_Dom = P.Id_Dom and A.Id_Dom = D.Id_Dom and P.Id_Proj = " + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Area) => {
                        var AreaInput = document.createElement('input')
                        var AreaLabel = document.createElement('label')
                        AreaInput.type = 'checkbox'
                        AreaInput.value = Area
                        AreaLabel.innerText = Area

                        db.setQuery("SELECT A.Nome FROM dbo.AreaProj U, dbo.Proj P, dbo.Area A WHERE U.Id_Area = A.Id_Area and U.Id_Proj = P.Id_Proj and P.Id_Proj = " + Element.id)
                        PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                            res.forEach((Element) =>{
                                if(AreaInput.value == Element){ AreaInput.checked = true }
                            })
                        })
                        
                        Area_Area.appendChild(AreaInput)
                        Area_Area.appendChild(AreaLabel)
                        ListArea.push(AreaInput)
                    }) 
                })

                db.setQuery("SELECT I.Nome FROM dbo.Investigador I, dbo.Participa C, dbo.Proj P WHERE C.Id_Proj = P.Id_Proj and I.Id_Inves = C.Id_Inves and P.Id_Proj = " + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => {
                        var InvesInput = document.createElement('input')
                        var InvesLabel = document.createElement('label')
                        InvesInput.type = 'checkbox'
                        InvesInput.checked = true
                        InvesLabel.innerText = Element
                        Area_Inves.appendChild(InvesInput)
                        Area_Inves.appendChild(InvesLabel)
                    }) 
                })

                db.setQuery("SELECT F.Funcao, C.Tempo_Percen, I.Nome FROM dbo.Investigador I, dbo.Funcao F, dbo.Participa C, dbo.Proj P WHERE C.Id_Proj = P.Id_Proj and F.Id_Funcao = C.Id_Funcao and I.Id_Inves = C.Id_Inves and P.Id_Proj = " + Element.id)
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                    res.forEach((Element) => {
                        var array = Element.split(' ')
                        var InvesLabel = document.createElement('p')
                        var Space = document.createTextNode('\u00A0')
                        var TempoLabel = document.createElement('p')
                        InvesLabel.innerText = array[4] + " " + array[5] + ": " + array[0]
                        TempoLabel.innerText = "Tempo: " + array[2] + "%"
                        Area_Funcao.appendChild(InvesLabel)
                        Area_Funcao.appendChild(TempoLabel)
                        Area_Funcao.appendChild(Space)
                    }) 
                })
            }else{
                Area_Area.replaceChildren()
                Area_Funcao.replaceChildren()
                Area_Inves.replaceChildren()
                Area_Key.replaceChildren()
            }
        })   
    })
}

AltProj.addEventListener('click', () => {
    db.setQuery("DELETE FROM dbo.KeyWord WHERE Id_Proj = " + Proj)
    PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) })

    db.setQuery("UPDATE dbo.Proj SET Nome = '" + NomeProj.value + "',Titulo = '" + TProj.value + "',Descricao = '" + DescriProj.value + "',Estado = '" + estado.value + "',Data_Inicio = '" + dinicio.value + "',Data_Fim = '" + dfim.value + "',Lingua = '" + Lingua.value + "' WHERE Id_Proj = " + Proj)
    PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) })

    db.setQuery("UPDATE dbo.Publi SET Url = '" + URL.value + "',Doi = '" + Doi.value + "' WHERE Id_Proj = " + Proj)
    PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) })

    ListKey.forEach((Key)=>{
        console.log(Key)
        db.setQuery("INSERT INTO dbo.Keyword VALUES(" + Proj + ",'" + Key.value + "')")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) })
    })
    
});