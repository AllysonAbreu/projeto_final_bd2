
function update(){

  const obj = {
    cpf: document.getElementById('cpf').value,
    info: document.getElementById('informacoes').value,
  }  

  fetch("http://localhost:3000/mongo",{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(response =>{alert('Realizando busca e atualizando.')})
      .catch(error => alert('Falha ao buscar!'));

}