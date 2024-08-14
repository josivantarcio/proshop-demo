import express from "express";
import products from "./data/products.js";
const PORT = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("API em execução...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
