import {openDatabase} from 'react-native-sqlite-storage';

// Open a database connection
const db = openDatabase(
  {
    name: 'ecommerceDB',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database: ', error);
  },
);

export function createProductTable() {
  // Create the product table
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, product_image TEXT, product_name TEXT, product_price REAL, product_mrp REAL, product_desc VARCHAR(800), minimum_product_order_quantity INT)',
      [],
      () => {
        console.log('Product table created successfully');
      },
      error => {
        console.error('Error creating product table: ', error);
      },
    );
  });
}

// add Product operations
export const addProduct = (
  product_image,
  product_name,
  product_price,
  product_mrp,
  product_desc,
  minimum_product_order_quantity,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO products (product_image, product_name, product_price, product_mrp,product_desc, minimum_product_order_quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [
          product_image,
          product_name,
          product_price,
          product_mrp,
          product_desc,
          minimum_product_order_quantity,
        ],
        (_, {insertId}) => {
          resolve(insertId);
          console.warn(' Inserted product values ==> ' + product_name);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

// Update product
export const updateProduct = (
  product_image,
  product_name,
  product_price,
  product_mrp,
  product_desc,
  minimum_product_order_quantity,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE products SET product_image = ?, product_name = ?, product_price = ?, product_mrp= ?, product_desc=?, minimum_product_order_quantity=? WHERE id = ?',
        [
          product_image,
          product_name,
          product_price,
          product_mrp,
          product_desc,
          minimum_product_order_quantity,
        ],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('Product not found'));
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

// Delete product
export const deleteProduct = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM products WHERE id = ?',
        [id],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('Product not found'));
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

// Get product list
export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (_, {rows}) => {
          const productList = [];
          for (let i = 0; i < rows.length; i++) {
            const {
              id,
              product_image,
              product_name,
              product_price,
              product_mrp,
              product_desc,
              minimum_product_order_quantity,
            } = rows.item(i);
            productList.push({
              id,
              product_image,
              product_name,
              product_price,
              product_mrp,
              product_desc,
              minimum_product_order_quantity,
            });
          }
          resolve(productList);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export default db;
