const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

let win;

// Caminho para o banco de dados SQLite
const db = new sqlite3.Database(path.join(__dirname, "db", "database.sqlite"));

// Criação da janela principal
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,         // segurança ativada
      nodeIntegration: false          // não permitir require no HTML
    }
  });

  win.loadFile("frontend/index.html");
}

// Cria a tabela de livros ao iniciar o app
app.whenReady().then(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      autor TEXT,
      editora TEXT,
      ano INTEGER,
      quantidade INTEGER
    )
  `);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// IPC: salvar livro
ipcMain.handle("livros:salvar", async (_, livro) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO livros (titulo, autor, editora, ano, quantidade) VALUES (?, ?, ?, ?, ?)",
      [livro.titulo, livro.autor, livro.editora, livro.ano, livro.quantidade],
      function (err) {
        if (err) {
          console.error("Erro ao salvar livro:", err.message);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
});

// IPC: listar livros
ipcMain.handle("livros:listar", async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM livros", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// IPC: deletar livro
ipcMain.handle("livros:deletar", async (_, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM livros WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
});

// Fecha o app quando todas janelas forem fechadas
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
