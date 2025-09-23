// GUIA https://expressjs.com/en/guide/routing.html

// Importar Express
import express from "express";
import sequelize from "./config/db.mjs";
import Producto from "./models/products.mjs";

// Crear servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Agregar a express el soporte para JSON
app.use(express.json());

// RUTAS
// Crear Ruta GET para obtener productos
app.get("/productos", async (req, res) => {
    try{
        const productos = await Producto.findall();
        res.json(productos);
    } catch (error){
        res.status(500).json({error: "Error al obtener los productos"});
    }
});

// Crear Ruta POST para crear producto
app.post("/productos", async(req, res) =>{
    try{
        const nuevoProducto = await Producto.creat(req.body);
        res.json(nuevoProducto);
    } catch (error){
        res.status(500).json({error: "Error al crear un nuevo producto"});
    }
})

// Crear Ruta PUT para modificar producto
app.put("/productos:id", async(req, res) => {
    try{
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) return res.status(404).json({ error: "Producto no encontrado" });

        await producto.update(req.body);
        res.json(producto);
    } catch (error){
        res.status(500).json({error: "Error al modificar un producto"});
    }
});

// Crear Ruta DELETE para eliminar un producto
app.delete("/productos:id", async(req, res) => {
    try{
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) return res.status(404).json({ error: "Producto no encontrado" });

        await producto.destroy();
        res.json({mensaje: "Producto eliminado correctamente"});
    } catch (error){
        res.status(500).json({error: "Error al eliminar un producto"});
    }
});


// Iniciar servidor express
// Dentro de la función hay que agregar sequelize.sync()

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

