import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  //Declarando o estado dos repositórios
  const [repositories, setRepositories] = useState([]);

  //Listagem de repositórios
  useEffect(() => {
    async function getFromApi(){
      //Buscando os repositórios da api
      await api.get("/repositories").then(response => {
        
        //guardando no estado para ser exibido na tela
        setRepositories(response.data);
  
      });

    }
    getFromApi();
    
  }, []);

  //Função para adicionar um novo repositório
  async function handleAddRepository() {
    //Fazendo a chamaada na api
    const response = await api.post('/repositories', {
      url: 'bomdia.com',
      title: 'Repositório de NodeJS',
      techs: ['ReactJS, React Native, NodeJS']
    });

    const repository = response.data;

    //Alterando os elementos na tela
    setRepositories([... repositories, repository])
  }

  //Função para remover um repositório
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    //Retirando o repositorio da tela
    const newRepositories = repositories.filter(repository => {
      return repository.id !== id;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
