export const config = () => ({
  databaseProd: {  
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        },
      }
        
        
      // },
      // ssl: 'no-verify',
      // ssl: {
      //   //   require: true,
      //     rejectUnauthorized: false
      //   },
      // extra: {

      // }  
        // extra: {
        //   ssl: true
        // },


        
      
      // sslmode: 'require',
      // sslmode: 'no-verify',
  },
  databaseDev: {  
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging:true
  }
});