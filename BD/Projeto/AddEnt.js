const { PythonShell } = require("python-shell");
const DatabaseConnect = require('DBConnection.js')
const db = new DatabaseConnect()
const PCSub = document.getElementById("PCSub")
const Area_Ent = document.getElementById('Area_Ent')
const Area_Proj = document.getElementById('Area_Proj')
const PCNome = document.getElementById('PCNome')
const PCDes = document.getElementById('PCDes')
const PCEmail = document.getElementById('PCEmail')
const PCTel = document.getElementById('PCTel')
const EntSub = document.getElementById("EntSub")
const EntDesig = document.getElementById("EntDesig")
const EntSigla = document.getElementById("EntSigla")
const EntMorada = document.getElementById("EntMorada")
const EntURL = document.getElementById("EntURL")
const EntPais = document.getElementById("EntPais")
var ListRadioProj = [], ListRadioEnt = [], Ent, Proj

db.setQuery("SELECT Id_Ent, Designacao FROM dbo.Entidade")
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
        radio.name = 'Ent'
        Area_Ent.appendChild(radio)
        Area_Ent.appendChild(label)
        ListRadioEnt.push(radio)
    })
    FEnt(ListRadioEnt)
})

//------------------------------------------------------------------------------
function FEnt(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
            Ent = Element.id
            db.setQuery("SELECT P.Id_Proj, P.Nome FROM dbo.Proj P, dbo.Entidade E, dbo.Financiamento F WHERE F.Id_Proj = P.Id_Proj and F.Id_Ent = E.Id_Ent and F.Id_Ent = " + Element.id)
            PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                console.log(db.getQuery())
                res.forEach((re) => {
                    var array = re.split(' ')
                    var checkbox = document.createElement('input')
                    var label = document.createElement('label')
                    checkbox.type = 'radio'
                    checkbox.id = array[0]
                    label.form = checkbox.id
                    label.innerText = array[2] + " " + array[3]
                    Area_Proj.appendChild(checkbox)
                    Area_Proj.appendChild(label)
                    ListRadioProj.push(checkbox)  
                })  
                FProj(ListRadioProj)
            })
            db.setQuery("SELECT P.Id_Proj, P.Nome FROM dbo.Proj P, dbo.Entidade E, dbo.ProgFinanciamento F, dbo.Doa D, dbo.Prog G WHERE E.Id_Ent = D.Id_Ent and D.Id_Prog = G.Id_Prog and G.Id_Prog = F.Id_Prog and F.Id_Proj = P.Id_Proj and D.Id_Ent = " + Element.id)
            PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                console.log(db.getQuery())
                res.forEach((re) => {
                    var array = re.split(' ')
                    var checkbox = document.createElement('input')
                    var label = document.createElement('label')
                    checkbox.type = 'radio'
                    checkbox.id = array[0]
                    label.form = checkbox.id
                    label.innerText = array[2] + " " + array[3]
                    Area_Proj.appendChild(checkbox)
                    Area_Proj.appendChild(label)
                    ListRadioProj.push(checkbox)  
                })  
                FProj(ListRadioProj)
            })

            Area_Proj.replaceChildren()
        })
    })
}
function FProj(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
           Proj = Element.id
        })
    })
}

//------------------------------------------------------------------------------
PCSub.addEventListener('click', () => {   
    db.setQuery("SELECT COUNT(*) FROM dbo.PC")
    PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
        db.setQuery("INSERT INTO dbo.PC VALUES(" + parseInt(res+1) + "," + Ent + "," + Proj + ",'" +  PCNome.value + "','" + PCDes.value + "','" + PCEmail.value + "','" + PCTel.value + "'" + ")")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
            console.log(db.getQuery())
        })
    })
});

EntSub.addEventListener('click', () => {
    db.setQuery("SELECT COUNT(*) FROM dbo.Entidade")
    PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
        console.log(db.getQuery())
        db.setQuery("INSERT INTO dbo.Entidade VALUES(" + parseInt(res+1) + ",'" + EntDesig.value + "','" + EntSigla.value + "','" + EntMorada.value + "','" + EntURL.value + "','" + EntPais.value + "')")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
            console.log(db.getQuery())
        })
    })
});