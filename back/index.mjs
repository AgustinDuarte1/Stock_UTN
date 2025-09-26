import express from "express";
import sequelize from "./config/db.mjs";
import Producto from "./models/products.mjs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// RUTAS
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});


app.post("/productos", async(req, res) =>{
    try{
        const nuevoProducto = await Producto.create(req.body);
        res.json(nuevoProducto);
    } catch (error){
        res.status(500).json({error: "Error al crear un nuevo producto"});
    }
})


app.put("/productos/:id", async(req, res) => {
    try{
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) return res.status(404).json({ error: "Producto no encontrado" });

        await producto.update(req.body);
        res.json(producto);
    } catch (error){
        res.status(500).json({error: "Error al modificar un producto"});
    }
});


app.delete("/productos/:id", async(req, res) => {
    try{
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) return res.status(404).json({ error: "Producto no encontrado" });

        await producto.destroy();
        res.json({mensaje: "Producto eliminado correctamente"});
    } catch (error){
        res.status(500).json({error: "Error al eliminar un producto"});
    }
});

(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("Conexión exitosa a la base de datos.")

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto${PORT}`);
        });
    } catch (error){
        console.log("Error al iniciar el servidor", error);
    }
})();

