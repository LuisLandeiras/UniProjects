const { PythonShell } = require("python-shell");
const DatabaseConnect = require('DBConnection.js');
const db = new DatabaseConnect()
const AddProj = document.getElementById("AddProjSub")
const Area_Dom = document.getElementById('Area_Dom')
const Area_Area = document.getElementById('Area_Area')
const Area_Inves = document.getElementById('Area_Inves')
const Area_Funcao = document.getElementById('Area_Funcao')
const Area_Key = document.getElementById('Area_Key')
const CreateKey = document.getElementById('CreateKey')
const TProj = document.getElementById("TProj")
const NomeProj = document.getElementById("NomeProj")
const DescriProj = document.getElementById("DescriProj")
const estado = document.getElementById("estado")
const Lingua = document.getElementById("Lingua")
const dinicio = document.getElementById("dinicio")
const dfim = document.getElementById("dfim")
const URL = document.getElementById("URL")
const DOI = document.getElementById("DOI")
var ListRadioDom = [], Dom, ListCheckBoxArea = [], ListCheckBoxInves = [], ListKeyWords = [], ListRadioFuncao = [], AreasCheck = [], Funcao = [], Tempo = []

db.setQuery("SELECT Id_Dom, Nome FROM dbo.Dom")
PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
    console.log(db.getQuery())
    res.forEach((Dom) => {
        var ArrayDom = Dom.split(' ')
        var DomInput = document.createElement('input')
        var DomLabel = document.createElement('label')
        DomInput.type = 'radio'
        DomInput.id = ArrayDom[0]
        DomInput.name = 'Dom' 
        DomLabel.form = DomInput.id
        DomLabel.innerText = ArrayDom[2]
        Area_Dom.appendChild(DomInput)
        Area_Dom.appendChild(DomLabel)
        ListRadioDom.push(DomInput)
    })
    CheckDom(ListRadioDom)
})

function CheckDom(List){
    List.forEach((Element) => {
        Element.addEventListener('click', () => {
            Dom = Element.id
            db.setQuery("SELECT A.Id_Area, A.Nome FROM dbo.Area A, dbo.Dom D WHERE A.Id_Dom = D.Id_Dom and D.Id_Dom = " + Element.id)
            PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                res.forEach((Area) =>{
                    var ArrayArea = Area.split(' ')
                    var AreaInput = document.createElement('input')
                    var AreaLabel = document.createElement('label')
                    AreaInput.type = 'checkbox'
                    AreaInput.id = ArrayArea[0]
                    AreaInput.name = 'Area' 
                    AreaLabel.form = AreaInput.id
                    AreaLabel.innerText = ArrayArea[2] + " " + ArrayArea[3]
                    Area_Area.appendChild(AreaInput)
                    Area_Area.appendChild(AreaLabel)
                    ListCheckBoxArea.push(AreaInput)
                })
                CheckArea(ListCheckBoxArea)
            })
            Area_Area.replaceChildren()
        })  
    })
}

function CheckArea(List){
    List.forEach((Element) => {
        Element.addEventListener('click', ()=>{
            if(Element.checked == true){
                AreasCheck.push(Element.id)
                db.setQuery("SELECT I.Id_Inves, I.Nome FROM dbo.Investigador I,dbo.Area A WHERE I.Id_Area = A.Id_Area and A.Id_Area = "+ Element.id + "and I.Id_Inves not in (SELECT Id_Inves from dbo.Participa GROUP BY Id_Inves HAVING SUM(Tempo_Percen) > 86)")
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    res.forEach((Inves) =>{
                        var ArrayInves = Inves.split(' ')
                        var InvesInput = document.createElement('input')
                        var InvesLabel = document.createElement('label')
                        InvesInput.type = 'checkbox'
                        InvesInput.id = ArrayInves[0]
                        InvesInput.name = 'Inves' 
                        InvesInput.value = ArrayInves[2] + " " + ArrayInves[3] 
                        InvesLabel.form = InvesInput.id
                        InvesLabel.innerText = ArrayInves[2] + " " + ArrayInves[3]
                        Area_Inves.appendChild(InvesInput)
                        Area_Inves.appendChild(InvesLabel)
                        ListCheckBoxInves.push(InvesInput)
                    })
                    CheckInves(ListCheckBoxInves)  
                })   
            }else{
                Area_Inves.replaceChildren()
            } 
        })
    })
}

function CheckInves(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', () =>{
            if(Element.checked == true){
                db.setQuery("SELECT F.Id_Funcao, F.Funcao FROM dbo.Funcao F")
                PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), function(err, res){
                    var p = document.createElement('p')
                    Area_Funcao.appendChild(p)

                    var Nome = document.createElement('p')
                    Nome.innerText = Element.value + ":"
                    
                    var TempoLabel = document.createElement('label')
                    var TempoInput = document.createElement('input')
                    TempoInput.type = 'number'
                    TempoLabel.innerText = "Tempo(%) "
                    Area_Funcao.appendChild(Nome)
                    Area_Funcao.appendChild(TempoLabel)
                    Area_Funcao.appendChild(TempoInput)
                    Tempo.push(TempoInput)

                    var p1 = document.createElement('p')
                    Area_Funcao.appendChild(p1)

                    res.forEach((Funcao) =>{
                        var ArrayFuncao = Funcao.split(' ')
                        var FuncaoInput = document.createElement('input')
                        var FuncaoLabel = document.createElement('label')
                        FuncaoInput.type = 'radio'
                        FuncaoInput.id = ArrayFuncao[0] + " " + Element.id
                        FuncaoInput.name = 'Funcao' + Element.id
                        FuncaoLabel.form = FuncaoInput.id
                        FuncaoLabel.innerText = ArrayFuncao[2] + " " + ArrayFuncao[3]
                        Area_Funcao.appendChild(FuncaoInput)
                        Area_Funcao.appendChild(FuncaoLabel)
                        ListRadioFuncao.push(FuncaoInput)
                    })
                    CheckFuncao(ListRadioFuncao)
                })
            }else{
                Area_Funcao.replaceChildren()
            }
        })
    })
}

function CheckFuncao(List){
    List.forEach((Element) =>{
        Element.addEventListener('click', () =>{
            Funcao.push(Element.id)
        })
    })
}

for(let i = 0; i < 3 ; i++){
    var KeyInput = document.createElement('input')
    var Space = document.createTextNode('\u00A0')
    KeyInput.type = 'text'
    KeyInput.name = 'Key'
    Area_Key.appendChild(KeyInput)
    Area_Key.appendChild(Space)
    ListKeyWords.push(KeyInput)
}
CreateKey.addEventListener('click', () => {
    var KeyInput = document.createElement('input')
    var Space = document.createTextNode('\u00A0')
    KeyInput.type = 'text'
    KeyInput.name = 'Key' 
    Area_Key.appendChild(KeyInput)
    Area_Key.appendChild(Space)
    ListKeyWords.push(KeyInput)
})

AddProj.addEventListener('click', async () => {
    db.setQuery("SELECT COUNT(*) FROM dbo.Proj")
    PythonShell.run("C:/BD/node_modules/DB.py", db.getConfig(), async function(err, res){
        console.log(db.getQuery())

        db.setQuery("INSERT INTO dbo.Proj VALUES(" + parseInt(res+1) + ",'" + NomeProj.value + "','" + TProj.value + "','" + DescriProj.value + "','" + estado.value + "','" + dinicio.value + "','" + dfim.value + "','" + Lingua.value + "'," + Dom + ")")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) })
        console.log("Proj Adicionado")

        db.setQuery("INSERT INTO dbo.Publi VALUES(" + parseInt(res+1) + ",'" + URL.value + "','" + DOI.value + "')")
        PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) }) 
        console.log("Publi Adicionado")

        
        AreasCheck.forEach((Area) =>{
            db.setQuery("INSERT INTO dbo.AreaProj VALUES(" + Area + "," + parseInt(res+1) + ")")
            PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) }) 
            console.log("Area Adicionado")
        })
        

        for(let i = 0; i < Funcao.length; i++){
            var Element = Funcao[i]
            var Array = Element.split(' ')
            if(Tempo[i].value > 100){ Tempo[i].value = 100; alert("Valores a cima de 100% foram alterados para 100%")  }
            if(Tempo[i].value < 15){ Tempo[i].value = 15; alert("Valores a baixo de 15% foram alterados para 15%") }
            db.setQuery("INSERT INTO dbo.Participa VALUES(" + parseInt(res+1) + "," + Array[0] + "," + Array[1] + "," + Tempo[i].value + ")")
            PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ console.log(db.getQuery()) }) 
            console.log("Funcao Adicionado")
        }  
        
        ListKeyWords.forEach((Key) =>{
            db.setQuery("INSERT INTO dbo.KeyWord VALUES(" + parseInt(res+1) + ",'" + Key.value + "')")
            PythonShell.run("C:/BD/node_modules/DBInsert.py", db.getConfig(), function(err, res){ 
                console.log(db.getQuery()) 
            })
        })

    })
})
