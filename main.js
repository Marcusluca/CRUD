'use strict'

const openModal = () => document.getElementById('modal')
     .classList.add('active')

const closeModal = () => document.getElementById("modal")
     .classList.remove('active')

const tempClient = {
    nome: 'marcus' ,
    email: "marcusluca1999@gmail.com",
    celular: "31986853937",
    cidade: "Ouro Preto"
}


//crud
const createClient = (Client )=> {
    localStorage.setItem("db_client",JSON.stringify(Client))

}




     //evento
document.getElementById('cadastrarClientes')
         .addEventListener('click', openModal)

document.getElementById('modalClose')
         .addEventListener('click', closeModal)