import express from "express"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const API_URL =
  "https://api.football-data.org/v4/teams/61/matches?status=SCHEDULED";
const API_TOKEN = process.env.FOOTBALL_DATA_TOKEN;

app.get("/matches", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los partidos");
    }

    const {matches} = await response.json();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
