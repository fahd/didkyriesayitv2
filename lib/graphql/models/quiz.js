import { connection } from '../db';

const Brands = {};

Brands.getBrand = ({brandid}, cb) => {
  const queryString = `SELECT * FROM brands WHERE brandid=${brandid} LIMIT 10;`

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

Brands.getAllBrands = () => {
  let queryString;
  // TO DO: order brands by most liked products
  queryString = `
    SELECT * FROM brands ORDER BY name ASC LIMIT 10
  `

  // SELECT DISTINCT brands.*,
  // (SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes
  //   FROM brands
  // INNER JOIN products on products.brandid = brands.brandid
  // INNER JOIN likes on products.productid = likes.productid
  // ORDER BY likes DESC LIMIT 10;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Brands.getAllBrandsPage = ({offset,letter}) => {
  let queryString;

  if (offset > 122) {
    queryString = `
      SELECT DISTINCT * 
      FROM brands 
      WHERE LEFT(lower(brands.slug), 1) 
      NOT SIMILAR TO '[a-z]'
    `
  }
  else {
    queryString = `
      SELECT DISTINCT * 
      FROM brands 
      WHERE LEFT(lower(brands.slug), 1) = '${letter}';
    `
  }
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Brands.getBrandsByQuery = ({searchQuery}) => {
  let queryString = `
    SELECT * FROM brands
    WHERE LOWER(brands.slug) LIKE LOWER('%${searchQuery}%')
    OR LOWER(brands.name) LIKE LOWER('%${searchQuery}%')
    LIMIT 10
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Brands.findBySlug = ({slug}, cb) => {
  const queryString = `SELECT brandid FROM brands WHERE slug='${slug}';`  

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

export default Brands;
