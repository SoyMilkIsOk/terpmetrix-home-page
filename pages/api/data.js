// import knex from "knex";
// const { Client } = require('pg');

// async function getDataFromRDS() {
//     const knexClient = knex({
//         client: "pg",
//         connection: {
//           host : 'test-db.ctfc5k8upep6.us-east-1.rds.amazonaws.com',
//           port: 5432,
//           user : 'postgres',
//           password : 'sn1DSAVQf76UiPcH1vM0',
//           database : 'postgres'
//         },
//       });

// knexClient
//   .select("*")
//   .from("test")
//   .then((data) => {
//     setData(data);
// });

//   console.log(data);

//   knexClient.destroy();
// }

// export default getDataFromRDS;

const { Client } = require('pg');

async function getDataFromRDS() {
  const client = new Client({
    host: 'your-rds-instance-endpoint',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database-name'
  });

  await client.connect();

  const result = await client.query('SELECT * FROM your_table');
  console.log(result.rows);

  client.end();
}

export default getDataFromRDS;
