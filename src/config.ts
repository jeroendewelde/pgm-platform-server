export const config = () => ({
  databaseProd: {
    type: "postgres",
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  databaseDev: {
    type: "postgres",
    host: process.env.HOST,
    port: 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  },
});
