import { Router } from "express";
import mongoose from "mongoose";
import { db } from "./config/database.js";
import { MarkerModel } from "./models/marker.js";

export const appRoutes = Router();

appRoutes.get("/location", async (req, res) => {
  // consulta todas as localizações.
  try {
    await mongoose.connect(db.mongoConection);
    const marker = await MarkerModel.find();
    res.status(200).json(marker);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

appRoutes.get("/location/:id", async (req, res) => {
  // consulta uma localização expecífica por ID
  const { id } = req.params.id;
  try {
    await mongoose.connect(db.mongoConection);
    const marker = await MarkerModel.findOne({ id: id });
    if (!marker) {
      res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(marker);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

appRoutes.post("/newlocation", async (req, res) => {
  // insere no formato JSON um nova localização.
  const { name, position } = req.body;
  const data = {
    name,
    position,
  };
  try {
    await mongoose.connect(db.mongoConection);
    const dataMarker = await MarkerModel.create(data);
    res.status(201).json(dataMarker);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

appRoutes.patch("/updatelocation/:id", async (req, res) => {
  // atualiza uma localização expecífica por ID
  const { id } = req.params;
  console.loig(id);
  const { name, position } = req.body;
  const data = {
    name,
    position,
  };
  try {
    await mongoose.connect(db.mongoConection);
    const updatelocation = await MarkerModel.updateOne({ _id: id }, data);
    if (updatelocation) {
      res.status(201).json(updatelocation);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

appRoutes.delete("/deletelocation/:id", async (req, res) => {
  // exclui uma localização expecífica por ID.
  const { id } = req.params;
  console.log(id);

  try {
    await mongoose.connect(db.mongoConection);
    const marker = await MarkerModel.findOne({ _id: id });
    if (marker) {
      await MarkerModel.deleteOne({ _id: id });
      res.status(200).json({ message: "Removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
