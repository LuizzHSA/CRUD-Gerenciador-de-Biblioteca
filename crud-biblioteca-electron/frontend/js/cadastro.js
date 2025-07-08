document.getElementById("formLivro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const livro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    editora: document.getElementById("editora").value,
    ano: parseInt(document.getElementById("ano").value),
    quantidade: parseInt(document.getElementById("quantidade").value)
  };

  try {
    await window.api.salvarLivro(livro); // ← aqui o erro acontece se preload estiver ausente
    document.getElementById("mensagem").innerText = "✅ Livro cadastrado com sucesso!";
    this.reset();
  } catch (err) {
    document.getElementById("mensagem").innerText = "❌ Erro ao cadastrar livro!";
    console.error("Erro ao salvar:", err);
  }
});
