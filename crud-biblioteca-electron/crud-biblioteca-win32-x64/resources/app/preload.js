const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  salvarLivro: (livro) => ipcRenderer.invoke("livros:salvar", livro),
  listarLivros: () => ipcRenderer.invoke("livros:listar"),
  deletarLivro: (id) => ipcRenderer.invoke("livros:deletar", id),
});
