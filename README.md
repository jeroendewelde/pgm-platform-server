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

THis wil automatically open the **register-screen** in your browser on [localhost:1337](http://localhost:1337).

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

# Run project (production)
