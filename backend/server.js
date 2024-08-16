import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB(); // Conectar ao MongoDB;

const app = express();

app.get("/", (req, res) => {
  res.send("API em execução...");
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

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

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
