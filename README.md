# PGM platform Server
This is a [strapi](https://strapi.io) application.  
This headless CMS will be used to store the data for the "PGM platform client".

# Install dependencies
To install the dependencies, run the following command:  

```bash
yarn install
# or
npm install
```

# Add local databse (only in development)
To test the application locally, you can add a local database with the name **pgmPlatform**

# Run project (development)
First, run the development server:

```bash
yarn develop
# or
npm run develop
```

This wil automatically open the **register-screen** in your browser on [localhost:1337](http://localhost:1337).

# Strapi Dashboard
WHen registering, the account will only be visible in your **local** database.  
**!important!** Your e-mail adress must be ALL lowercase, else the registration will fail without giving user feedback.

## Content-Type Builder 
ONLY in development mode, you can use the **content-type builder** to create entities. These entities will ONLY be visible in your local database.

## Content Manager
In the content manager, you can create, edit and delete records for each entitiy in the database.  
This will only apply to your local database.

# Deployment
The app will be deployed on **heroku**.  
To push changes from the main branch to heroku use the following command:
`git push heroku HEAD:main`

After deployment, the app is visible on the following URL:

[https://pgm-platform-server.herokuapp.com/](https://pgm-platform-server.herokuapp.com/)


# Run project (production)
To run the applicaiton in production mode, add the following to the **.env** file in the root of your project:
```
JWT_SECRET=df2b55d8-6953-4891-91dc-00a0d27d455f
API_TOKEN_SALT=29355f8a6d12e6202f11773182f0a41e

DATABASE_HOST = ec2-99-80-108-106.eu-west-1.compute.amazonaws.com
DATABASE_PORT = 5432
DATABASE_NAME = d8gjmie39pp46s
DATABASE_USERNAME = pkbprrrvwrgjkt
DATABASE_PASSWORD = 0e0c0396b5c8a7f5e41441d98f272b171144d48260651a6f2b702bdc05d9b0df
DATABASE_SSL = true

CLOUDINARY_NAME = dgfgw9ngd
CLOUDINARY_KEY = 298424895728527
CLOUDINARY_SECRET = JTKAQNRibTZzynWGf4Mmok_hreE
```

Because you aren't able to **edit** content-types in production, you can run the app in development BUT use the external heroku database. This can also be done with the following command:

```bash
yarn develop
# or
npm run develop
```

This wil automatically open the **register-screen** in your browser on [localhost:1337](http://localhost:1337).  
The same credentials can be used here as on the deployed app on heroku.

