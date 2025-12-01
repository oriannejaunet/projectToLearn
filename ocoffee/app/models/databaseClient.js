// On importe la classe Client depuis le module pg
import { Client } from 'pg';

//***CONNEXION à la BDD */
// 2. On instancie un nouveau client avec les informations de notre BDD
const client = new Client(process.env.POSTGRES_CONNECTION_STRING);

// On se connecte
client.connect();

export default client;