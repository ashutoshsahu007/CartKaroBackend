import cors from "cors";

app.use(cors());

export default function handler(req, res) {
  res.json({ message: "Hello from API" });
}
