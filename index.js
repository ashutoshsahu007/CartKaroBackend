import express from "express";
import fetch from "node-fetch"; // Ensure you have node-fetch installed
import cors from "cors"; // Ensure you have cors installed
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/swiggy", async (req, res) => {
  try {
    const swiggyURL =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(typeof data);
    res.json(data);
  } catch (err) {
    console.log("Error fetching data from Swiggy:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/:resId", async (req, res) => {
  try {
    const resId = req.params.resId;

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log("Error fetching data from Swiggy:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
