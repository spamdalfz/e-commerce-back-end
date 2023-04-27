const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Product },
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

 // find a single tag by its `id`
 router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ]
    });
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// update tag
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// delete one tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;