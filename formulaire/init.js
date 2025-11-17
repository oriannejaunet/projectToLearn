import { db } from "./src/utils/client.js";
import { faker } from '@faker-js/faker/locale/fr';

export async function init() {
  // Check if the database has been initialized
  // Count nb of tables in the database in postgres
  const result = await db.query("SELECT count(*) FROM pg_tables WHERE schemaname='public';");
  if(result.rows[0].count === 0) {
    console.log('initializing database...');

    await db.query(`
      CREATE TABLE food (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    for(let i = 1; i <= 10; i++) {
      await db.query(`
        INSERT INTO food (name) VALUES ('${faker.food.dish()}');
      `);
    }
  }
}

await init();
