const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Product },
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

// GET one category by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// UPDATE a category by id
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      await category.update(req.body);
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      await category.destroy();
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});


module.exports = router;