'use strict'

const openModal = () => document.getElementById('modal')
     .classList.add('active')

const closeModal = () =>{
     clearFields()

     document.getElementById("modal").classList.remove('active')
      

    
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Client')) ?? []
const setLocalStorage =(dbClient) => localStorage.setItem("db_Client", JSON.stringify(dbClient))
//crud


//crud delete
const deleteClient = (index) => {
     const dbClient = readClient()
     dbClient.splice(index,1)
     setLocalStorage(dbClient)
}


//crud update

const updateClient = (index , client) =>{
     const dbClient = readClient()
     dbClient[index] = client
     setLocalStorage(dbClient)
}
//read
const readClient = () => getLocalStorage()


//crud - create
const createClient = (Client )=> {
     const dbClient = getLocalStorage()
     dbClient.push(Client)
     setLocalStorage(dbClient)
}


const isValidFields =() => {
     return document.getElementById('form').reportValidity()
}



//interação com o layout
const clearFields =() =>{
     const fields = document.querySelectorAll('.modal-field')
     fields.forEach(field => field.value ="")
     document.getElementById('nome').dataset.index = 'new'
     document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}
const saveClient = () => {
     if(isValidFields()){
          const client = {
               nome: document.getElementById('nome').value,
               email: document.getElementById('email').value,
               celular: document.getElementById('celular').value,
               cidade: document.getElementById('cidade').value


          }

          const index =document.getElementById('nome').dataset.index
          if(index == "new"){
          createClient(client)
          updateTable()
          closeModal()
          }else {
               updateClient(index, client)
               updateTable()
               closeModal()
          }
          
     }

}


const createRow = (client, index) => {
     const newRow = document.createElement('tr')
     newRow.innerHTML = `
         <td>${client.nome}</td>
         <td>${client.email}</td>
         <td>${client.celular}</td>
         <td>${client.cidade}</td>
         <td>
             <button type="button" class="button green" id="edit-${index}">Editar</button>
             <button type="button" class="button red" id="delete-${index}" >Excluir</button>
         </td>
     `
     
     

     document.querySelector('#tableClient>tbody').appendChild(newRow)



}
const clearTable =()=>{
     const rows = document.querySelectorAll('#tableClient>tbody tr')
     rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
     const dbClient =  readClient()
     clearTable()
     dbClient.forEach(createRow)

}
const fillfields = (client)=>{
     document.getElementById('nome').value =client.nome
     document.getElementById('email').value =client.email
     document.getElementById('celular').value =client.celular
     document.getElementById('cidade').value =client.cidade
     document.getElementById('nome').dataset.index =client.index
}

const editClient =(index) =>{
     const client = readClient()[index]
     client.index = index
     fillfields(client)
     openModal()
}
const editDelete = (event) => {
     if(event.target.type =="buton"){
          const[action, index] = event.target.id.split('-')
          
          if(action =='edit'){
               editClient(index)

          }else {
               const client = readClient()[index]
               const responsive = confirm(`dejesa realmente excluir o cliente?${client.nome}`)
               if(responsive){
               deleteClient(index)
               updateTable()
               }

          }
     }
}

updateTable()
     //evento


document.getElementById('cadastrarClientes')
         .addEventListener('click', openModal)

document.getElementById('modalClose')
         .addEventListener('click', closeModal)


document.getElementById('salvar')
         .addEventListener('click',saveClient)

document.querySelector('#tableClient>tbody')
     .addEventListener('click', editDelete)