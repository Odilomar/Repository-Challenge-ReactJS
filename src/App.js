import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

import toastr from "toastr";

function App() {
  const [repositories, setRepositories] = useState([]);

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  useEffect(() => {
    toastr.success(
      "We do have the Kapua suite available.",
      "Turtle Bay Resort",
      { timeOut: 5000 }
    );
    api.get("repositories").then((response) => {
      var { data } = response;

      setRepositories([...data]);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status !== 204) return console.log("Não removeu!");

    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <header>
        <h2>Front-end Repository Challenge with ReactJS</h2>
        <button onClick={handleAddRepository}>Adicionar</button>
      </header>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <aside key={repository.id}>
              <li>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
              <hr />
            </aside>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
