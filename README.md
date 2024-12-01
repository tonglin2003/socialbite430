## Frontend Set Up
1. make sure you are inside the frontend folder:
```
cd frontend
```

2. install the node module packages
```
npm install
```

3. start running the application
```
npm run dev
```

if there are any package not being install, then it will tell you in the terminal or the website application, and just install by entering `npm install <package to install>`


## Step to setup the database in postgresql
1. Download PostgreSQL, and make sure its running. For my case, I have used homebrew to download and start the PostgreSQL

```
brew install psql
brew services start postgresql
```

2. create your account in postgresql to have access through entering
```
createdb <your  username>
```

3. enter the following to connect to the postgresql:
```
psql
```

4. Add the password for the user you created for security
```
ALTER USER <your username> WITH PASSWORD 'your_password';
```


5. Enter the following to set up the database that we will be using for this project
```
CREATE DATABASE social_bite;
```

6. Connect to the datbase through entering these in the terminal
```
psql -U <username> -d <database>

```

7. Install the following postgresql extension
```
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
```

### Steps to use Visual Studio to see the postgresql database
1. Install PostgreSQL by Chris Kolkman inside visual studio
2. After install, it will show up on your side bar with an icon of visual studio
3. After click onto the icon, add a new database connection by clicking on the + button
4. Hostname: localhost, user: the username you used to create database, password: password you used, port: 5432, standard connection. Finally, choose the database "social_bite" that was created. 

## Step to setup a backend
1. Cd into the backend
```
cd backend
```

2. inside the terminal enter the following to download all the needed package:
```
npm install
```

3. Add an `.env` at the root level of the backend folder and enter the following
```
DB_USER=<user you are using>
DB_HOST=localhost
DB_NAME=<The database name you are using for your app>
DB_PASSWORD=<your password for the user>
DB_PORT=5432
SESSION_SECRET=54abfd3bc273b747566b9cb56fa197a140af7bc0c17243c70e9037def0e061e2b220df928112d61302e44d4912006e644cfb82c1942ab1f20a1939fd7fc0e467
```

4. Start the sequelize services, first run the mitigration, then the seed. Enter the following:
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

note: if you need to undo the migration and seeder, use the following command
```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```

5. start the backend application by entering the following
```
npm start
```

and if there are any missing package, it will tell you in the terminal and just download it by entering `npm install <package to install>`


After you finish all the steps above, you should see this.
    - currently the login function is working with the account
        "janeDoe@gmail.com" and password of "password"
    - the sign up feature is also working

<img width="1511" alt="Screenshot 2024-10-24 at 5 15 45 PM" src="https://github.com/user-attachments/assets/ed1919b5-0e1a-41f6-9355-c3cdeba43ec7">
