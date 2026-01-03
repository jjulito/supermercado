import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.send("Backend Running with DummyJSON");
});

// Products route
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

// Products by category route
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, "127.0.0.1", () => console.log(`Backend running on port ${PORT}`));
