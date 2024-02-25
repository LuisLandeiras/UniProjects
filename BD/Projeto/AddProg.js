const { PythonShell } = require("python-shell");
const DatabaseConnect = require('DBConnection.js')
const db = new DatabaseConnect()
const Area_Dom = document.getElementById('Area_Dom')
const AddProg = document.getElementById("AddProgSub")
const ProgNome = document.getElementById("ProgNome")
var ListRadioDom = []

//Adicinar RadioButtons Dinamicos
db.setQuery("SELECT Id_Dom, Nome FROM dbo.Dom")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((r) => {
        var array = r.split(' ')
        console.log(array)
        var radio = document.createElement('input')
        var label = document.createElement('label')
        radio.type = 'radio'
        radio.id = array[0]
        label.form = radio.id
        label.innerText = array[2] + " " + array[3]
        radio.name = 'Dominio'
        Area_Dom.appendChild(radio)
        Area_Dom.appendChild(label)
        ListRadioDom.push(radio)
    })
})

//Colocar na BD as informações sobre o Programa criado
AddProg.addEventListener('click', () => {
    ListRadioDom.forEach((r) => {
        if(r.checked == true){
            db.setQuery("SELECT COUNT(*) FROM dbo.Prog")
            PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                console.log(db.getQuery())
                db.setQuery("INSERT INTO dbo.Prog VALUES(" + parseInt(res+1) + "," + r.id + ",'" + ProgNome.value + "')")
                PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){
                    console.log(db.getQuery())
                })
            })
        }
    }) 
});


