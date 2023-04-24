// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // foreign key for the category in the product table
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // foreign key for the category in the product table
  onDelete: 'CASCADE', // delete products when category is deleted
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // foreign key for the product in the product tag table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // foreign key for the tag in the product tag table
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
