function del(){

  const obj = {
    cpf: document.getElementById('cpf3').value,    
  }  

  fetch("http://localhost:3000/postgres",{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(response =>{alert('Realizando busca.')})
      .catch(error => alert('Falha ao buscar!'));

  fetch("http://localhost:3000/mongo",{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(response =>{alert('Realizando busca.')})
      .catch(error => alert('Falha ao buscar!'));
    
  fetch("http://localhost:3000/neo",{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response =>{alert('Realizando busca.')})
  .catch(error => alert('Falha ao buscar!'));
}

function search(){

  const cpf = document.getElementById('cpf1').value

  fetch(`http://localhost:3000/mongo/${cpf}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
      }).then(response => response.json())
      .then((string) => alert(string))
      .catch(error => alert(error));
}

function update(){

  const obj = {
    cpf: document.getElementById('cpf2').value,
    info: document.getElementById('informacoes').value
  }  

  fetch("http://localhost:3000/mongo/:cpf/:info",{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(response =>{alert('Realizando busca e atualizando.')})
      .catch(error => alert('Falha ao buscar!'));

}

function ligar(){

  const obj = {
    cpf1: document.getElementById('cpf1').value,
    cpf2: document.getElementById('cpf2').value
  }

  fetch("http://localhost:3000/neo/:cpf1/:cpf2",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(response =>{alert('Realizando busca e atualizando.')})
      .catch(error => alert('Falha ao buscar!'));

}


function verContatos(){

  const cpf3 = document.getElementById('cpf3').value

  fetch(`http://localhost:3000/neo/${cpf3}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
      }).then(response => response.json())
      .then((resultados) => {
        resultados.forEach(resultado => alert(resultado.cpf))
      })
      .catch(error => alert('Falha ao buscar!'))
}