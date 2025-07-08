window.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("tabelaLivros");

  try {
    const livros = await window.api.listarLivros();

    // Se nenhum livro estiver cadastrado
    if (!livros || livros.length === 0) {
      tabela.innerHTML = `<tr><td colspan="6" class="text-center">Nenhum livro cadastrado.</td></tr>`;
      return;
    }

    // Preenche a tabela com os livros
    livros.forEach((livro) => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.editora}</td>
        <td>${livro.ano}</td>
        <td>${livro.quantidade}</td>
        <td>
          <button class="btn btn-sm btn-danger me-2" onclick="deletarLivro(${livro.id})">🗑️</button>
        </td>
      `;

      tabela.appendChild(linha);
    });

  } catch (err) {
    console.error("Erro ao carregar livros:", err);
    tabela.innerHTML = `<tr><td colspan="6" class="text-danger text-center">Erro ao carregar livros.</td></tr>`;
  }
});

async function deletarLivro(id) {
  const confirmar = confirm("Deseja realmente deletar este livro?");
  if (confirmar) {
    try {
      await window.api.deletarLivro(id);
      location.reload(); // recarrega para atualizar a lista
    } catch (err) {
      console.error("Erro ao deletar livro:", err);
      alert("Erro ao deletar livro.");
    }
  }
}
