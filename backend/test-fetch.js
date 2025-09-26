const fetch = require("node-fetch");

(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
})();
