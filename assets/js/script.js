// lista onde ficam as disciplinas
let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || []

// função para salvar no localStorage
function salvarDados(){
localStorage.setItem("disciplinas", JSON.stringify(disciplinas))
}

// função para mostrar disciplinas na tela
function listarDisciplinas(){

const lista = document.getElementById("listaDisciplinas")
lista.innerHTML = ""

if(disciplinas.length === 0){
lista.innerHTML = "<p>Nenhuma disciplina cadastrada.</p>"
return
}

disciplinas.forEach((disciplina, index) => {
let progresso = ((disciplina.horasEstudadas / disciplina.carga) * 100).toFixed(1)
lista.innerHTML += `
<div class="disciplina">
<h3>${disciplina.nome}</h3>
<p><b>Professor:</b> ${disciplina.professor}</p>
<p><b>Área:</b> ${disciplina.area}</p>
<p><b>Carga horária:</b> ${disciplina.carga}h</p>
<p><b>Horas estudadas:</b> ${disciplina.horasEstudadas}h</p>
<p class="progresso">Progresso: ${progresso}%</p>
<input type="number" placeholder="Adicionar horas" id="horas${index}">
<button onclick="registrarHoras(${index})">Registrar estudo</button>
<button onclick="editarDisciplina(${index})">Editar</button>
<button onclick="excluirDisciplina(${index})">Excluir</button>
</div>
`
})

}


// cadastro de disciplina
document.getElementById("formDisciplina").addEventListener("submit", function(e){

e.preventDefault()

let nome = document.getElementById("nome").value
let professor = document.getElementById("professor").value
let carga = document.getElementById("carga").value
let area = document.getElementById("area").value

// validação simples
if(nome === "" || professor === "" || carga === "" || area === ""){
alert("Preencha todos os campos")
return
}

disciplinas.push({
nome,
professor,
carga: Number(carga),
area,
horasEstudadas: 0
})

salvarDados()
listarDisciplinas()
this.reset()

})
//registrar horas estudadas
function registrarHoras(index){

let horas = document.getElementById("horas"+index).value

if(horas === "" || horas <= 0){
alert("Digite horas válidas")
return
}
disciplinas[index].horasEstudadas += Number(horas)
salvarDados()
listarDisciplinas()
}

//excluir disciplina
function excluirDisciplina(index){

if(confirm("Deseja excluir essa disciplina?")){
disciplinas.splice(index,1)

salvarDados()
listarDisciplinas()
}

}

//editar disciplina
function editarDisciplina(index){

let novoNome = prompt("Novo nome da disciplina:", disciplinas[index].nome)

if(novoNome){
disciplinas[index].nome = novoNome
salvarDados()
listarDisciplinas()
}

}

//mostrar disciplinas ao abrir o site
listarDisciplinas()

