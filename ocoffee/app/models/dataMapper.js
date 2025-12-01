/* eslint-disable @stylistic/indent */
import client from './databaseClient.js';

export default {

  async findAllCoffee(){
    const results = await client.query(`
    SELECT 
      coffee.reference,
      coffee.name,
      coffee.description,
      coffee.price,
      coffee.available,
      country.name AS country_name,
      ARRAY_AGG(characteristic.name) AS characteristics
    FROM coffee
    LEFT JOIN country ON coffee.country_id = country.country_id
    LEFT JOIN "include" ON coffee.reference = "include".reference
    LEFT JOIN characteristic ON "include".characteristic_id = characteristic.characteristic_id
    GROUP BY coffee.reference, country.name
    ORDER BY coffee.name ASC;
  `);
    return results.rows;
  },

  async findCoffeeByReference(coffeeId){
    const results = await client.query(`
    SELECT 
      coffee.reference,
      coffee.name,
      coffee.description,
      coffee.price,
      coffee.available,
      country.name AS country_name,
      ARRAY_AGG(characteristic.name) AS characteristics
    FROM coffee
    LEFT JOIN country ON coffee.country_id = country.country_id
    LEFT JOIN "include" ON coffee.reference = "include".reference
    LEFT JOIN characteristic ON "include".characteristic_id = characteristic.characteristic_id
    WHERE coffee.reference = $1
    GROUP BY coffee.reference, country.name;
  `, [coffeeId]);

    if (results.rowCount === 0){
      return null;
    }
    return results.rows[0];
  },

  async findCoffeeByCountryId(countryId){
    const results = await client.query(`
    SELECT 
      coffee.reference,
      coffee.name,
      coffee.description,
      coffee.price,
      coffee.available,
      country.name AS country_name,
      ARRAY_AGG(characteristic.name) AS characteristics
    FROM coffee
    LEFT JOIN country ON coffee.country_id = country.country_id
    LEFT JOIN "include" ON coffee.reference = "include".reference
    LEFT JOIN characteristic ON "include".characteristic_id = characteristic.characteristic_id
    WHERE coffee.country_id = $1
    GROUP BY coffee.reference, country.name
    ORDER BY coffee.name ASC;
  `, [countryId]);
  
    return results.rows;
  },


  async addCoffee(coffee) {
    const query = `
        INSERT INTO coffee (reference, name, description, price, available, country_id)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
        coffee.reference,
        coffee.name,
        coffee.description,
        coffee.price,
        coffee.available,
        coffee.country_id
    ];

    await client.query(query, values);
},

async addCoffee(coffee) {
    const query = `
        INSERT INTO coffee (reference, name, description, price, available, country_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING reference;
    `;

    const values = [
        coffee.reference,
        coffee.name,
        coffee.description,
        coffee.price,
        coffee.available,
        coffee.country_id
    ];

    const result = await client.query(query, values);
    return result.rows[0];
},

async addCoffeeCharacteristic(coffeeId, characteristicId) {
    const query = `
        INSERT INTO include (reference, characteristic_id)
        VALUES ($1, $2)
    `;

    await client.query(query, [coffeeId, characteristicId]);
},

async getAllCountries() {
    const query = `SELECT * FROM country ORDER BY name`;
    return (await client.query(query)).rows;
},

async getAllCharacteristics() {
    const query = `SELECT * FROM characteristic ORDER BY name`;
    return (await client.query(query)).rows;
}

};