import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      var { data } = response;

      setRepositories([...data]);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
        <div>
          <h2>Front-end Repository Challenge with ReactJS</h2>
          <button onClick={handleAddRepository}>Adicionar</button>
        </div>
        <ul data-testid="repository-list">
          {repositories.map((repository) => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      </div>
  );
}

export default App;
