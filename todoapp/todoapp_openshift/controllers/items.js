const { Item } = require('../models/db');

module.exports = function(app) {
  // Obtener todas las tareas
  app.get('/api/items', async (req, res) => {
    try {
      const items = await Item.findAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Crear una nueva tarea
  app.post('/api/items', async (req, res) => {
    try {
      const newItem = await Item.create({
        description: req.body.description,
        done: req.body.done || false
      });
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Actualizar una tarea por ID
  app.put('/api/items/:id', async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });

      item.description = req.body.description ?? item.description;
      item.done = req.body.done ?? item.done;
      await item.save();

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Eliminar una tarea por ID
  app.delete('/api/items/:id', async (req, res) => {
    try {
      const deleted = await Item.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.json({ message: 'Item deleted' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};
