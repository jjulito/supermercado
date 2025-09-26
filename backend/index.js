import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Backend Running with DummyJSON");
});

// Ruta de todos los productos
app.get("/products", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("Fetch failed");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Ruta de productos por categoría
app.get("/products/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!response.ok) throw new Error("Fetch failed for category");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Error fetching category" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
