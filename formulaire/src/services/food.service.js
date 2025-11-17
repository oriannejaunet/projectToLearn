import { db } from "../utils/client.js";

/**
 * Get all food items, optionally filtered by name
 * @param {string | undefined} name
 * @returns {Promise<Array<{id: number, name: string}>>} List of all food items
 */
export async function getAllFoods(name) {
  const { rows } = await db.query("SELECT * FROM food WHERE $1::text IS NULL OR name ILIKE '%' || $1 || '%'", [name]);
  return rows;
}

/**
 * Get a food item by its ID
 * @param {number} id 
 * @returns {Promise<{id: number, name: string}>} Food item
 */
export async function getFoodById(id) {
  const { rows } = await db.query("SELECT * FROM food WHERE id = $1", [id]);
  return rows[0];
}

/**
 * Add a new food item
 * @param {string} name
 * @returns {Promise<{id: number, name: string}>} Newly created food item
 */
export async function addFood(name) {
  const { rows } = await db.query(
    "INSERT INTO food (name) VALUES ($1) RETURNING *",
    [name]
  );
  return rows[0];
}

/**
 * Update a food item by its ID
 * @param {number} id
 * @param {string} name
 * @returns {Promise<{id: number, name: string}>} Updated food item
 */
export async function updateFood(id, name) {
  const { rows } = await db.query(
    "UPDATE food SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return rows[0];
}

/**
 * Delete a food item by its ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteFood(id) {
  await db.query("DELETE FROM food WHERE id = $1", [id]);
}
