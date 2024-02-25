const { PythonShell } = require("python-shell");
const DatabaseConnect = require('DBConnection.js')
const db = new DatabaseConnect()
const Area_EntI = document.getElementById('Area_EntI')
const Area_EntP = document.getElementById('Area_EntP')
const Area_ProjI = document.getElementById('Area_ProjI')
const Area_ProjP = document.getElementById('Area_ProjP')
const Area_ProgP = document.getElementById('Area_ProgP')
const FISub = document.getElementById("FISub")
const FPSub = document.getElementById("FPSub")
const ValorI = document.getElementById("ValorI")
const ValorP = document.getElementById("ValorP")
var ListRadioProjI = [], ListRadioEntI = [], ListRadioProjP = [], ListRadioProgP = [], ListRadioEntP = [], EntI, EntP, ProjI, ProjP = [], ProgP

//Form Independente
//------------------------------------------------------------------------------------------------------
db.setQuery("SELECT Designacao FROM dbo.Entidade")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = parseInt(res.indexOf(r))
        label.form = radio.id
        label.innerText = r
        radio.name = 'EntI'
        Area_EntI.appendChild(radio)
        Area_EntI.appendChild(label)
        ListRadioEntI.push(radio)
    })
    FEntI(ListRadioEntI)
})
function FEntI(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
           EntI = Element.id
        })
    })
}

db.setQuery("SELECT Nome FROM dbo.Proj")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = parseInt(res.indexOf(r))
        label.form = radio.id
        label.innerText = r
        radio.name = 'ProjI'
        Area_ProjI.appendChild(radio)
        Area_ProjI.appendChild(label)
        ListRadioProjI.push(radio)
    })
    FProjI(ListRadioProjI)
})
function FProjI(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
            ProjI = Element.id
        })
    })
}

FISub.addEventListener('click', () => {   
    db.setQuery("INSERT INTO dbo.Financiamento VALUES(" + EntI + "," + ProjI + "," + ValorI.value + ")")
    PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
        console.log(db.getQuery())
    })
});
//------------------------------------------------------------------------------------------------------

//Form Programa
//------------------------------------------------------------------------------------------------------
db.setQuery("SELECT Designacao FROM dbo.Entidade")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = parseInt(res.indexOf(r))
        label.form = radio.id
        label.innerText = r
        radio.name = 'EntP'
        Area_EntP.appendChild(radio)
        Area_EntP.appendChild(label)
        ListRadioEntP.push(radio)
    })
    FEntP(ListRadioEntP)
})
function FEntP(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
           EntP = Element.id
        })
    })
}

//-----------------------------------------------------------------------------
db.setQuery("SELECT Id_Dom, Id_Prog, Nome FROM dbo.Prog")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var array = r.split(' ')
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = array[0] + " " + array[2]
        label.form = radio.id
        label.innerText = array[4] + " " + array[5]
        radio.name = 'ProgP'
        Area_ProgP.appendChild(radio)
        Area_ProgP.appendChild(label)
        ListRadioProgP.push(radio)  
    })
    FProgP(ListRadioProgP)
})

function FProgP(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
            var array = Element.id.split(' ')
            ProgP = array[1]
            db.setQuery("SELECT P.Id_Proj, P.Nome FROM dbo.Proj P, dbo.Dom D WHERE P.Id_Dom = D.Id_Dom and D.Id_Dom =" + parseInt(array[0]))
            PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                console.log(db.getQuery())
                res.forEach((re) => {
                    var array = re.split(' ')
                    var checkbox = document.createElement('input')
                    var label = document.createElement('label')
                    checkbox.type = 'checkbox'
                    checkbox.id = array[0]
                    label.form = checkbox.id
                    label.innerText = array[2] + " " + array[3]
                    Area_ProjP.appendChild(checkbox)
                    Area_ProjP.appendChild(label)
                    ListRadioProjP.push(checkbox)  
                })  
                FProjP(ListRadioProjP)
            })
            Area_ProjP.replaceChildren()
        })
    })
}
function FProjP(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', function(){
            ProjP.push(Element.id)
        })
    })
}

//-----------------------------------------------------------------------------
FPSub.addEventListener('click', () => {   
    db.setQuery("INSERT INTO dbo.Doa VALUES(" + EntP + "," + ProgP + "," + ValorP.value + ")")
    PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
        console.log(db.getQuery()) 
    })
    ProjP.forEach((Element) =>{
        db.setQuery("INSERT INTO dbo.ProgFinanciamento VALUES(" + ProgP + "," + Element + ")")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
        console.log(db.getQuery())
        }) 
    })
    
});
//------------------------------------------------------------------------------------------------------


