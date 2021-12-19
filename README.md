# PGM-platform
This project uses "yarn workspaces", having just 1 node_modules-folder in the root, refering to the client & server projects.

# Install dependencies
Run `yarn install` in the root directory to install the dependencies for **both** server & client.

# Run project
## Client
To run the **next** client, change directories with `cd client`, then run the command `yarn start`.

### Browser
To access the client, go to the URL:  
[http://localhost:3000](http://localhost:3000)


## Server
First create a **database** on your local machine with the name "pgmPlatform".  
In a second terminal screen, chnage directories with `cd server`, then run the command `yarn develop` to run it in development mode.

### Browser
To access strapi, go to the URL:
[http://localhost:1337](http://localhost:1337)  
Create an account, this will only be used locally, and the passwordt is only stored on your local machine.  
**!IMPORTANT!** If the Registration form is not working, make sure your email is in all lowercase.  
### Dashboard
Now in the dashobard, you can create entities with the "Content-Type Builder" & add new records to the database with the "Content Manager".  
In development it is possible to create new entities, in production it is not possible. Therefore all entities must be made locally before hosting on 'Heroku' or other.


# Documentation YARN workspaces
[https://classic.yarnpkg.com/lang/en/docs/workspaces/](https://classic.yarnpkg.com/lang/en/docs/workspaces/)