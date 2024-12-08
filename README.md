# eIPS Fidelity Web Application

"The Beast" is a web application used by the Department of Psychiatry at UNC-Chapel Hill to collect and examine data from various mental health agencies across North Carolina to help find employment for those who are struggling with mental health and/or substance use disorders.

The intended goal of "The Beast" is to make the data collection more streamline for our client.

## Project Structure

"The Beast" utilizes the MEAN stack.

- MongoDB
- Express.js
- Angular
- Node.js

The frontend web application is built up using Angular and Survey.js.
The backend API is built up using Node.js, Express.js, and mongoose for database connection.
The database is MongoDB.

**Programming Languages**
Frontend: HTML/CSS, Typescript
Backend: TypeScript

![IMG_0156](https://github.com/QianqianHong/COMP523-TeamC/assets/77793476/dc771ff6-b763-4511-b8c4-2ae760c6ceed)

## Frontend Structure

The frontend has component folders for each required survey. Within those folders there are more specific components that relate to adding data and displaying group or individual data. More details in code comments.

There is also a model folder, with instances that relate to each survey for data interfacing/modeling purposes, and a service folder that has components for HTTP to the backend API connections.

Resources used for the frontend:

> [Connecting Angular to a Node.js application](https://www.bezkoder.com/mean-stack-crud-example-angular-14/)
> [Creating a dynamic Angular Mat Table](https://muhimasri.com/blogs/create-an-editable-dynamic-table-using-angular-material/)

## Backend Structure

The backend follows a RESTful API structure.

Resources used for the backend:

> [RESTful API structure](https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way)
> [Express Routing](https://expressjs.com/en/guide/routing.html#express-router)

Note: Please include your gmail address and app password in `.env` file in the `api` folder:
`EMAIL_PASSWORD=#####`
`EMAIL_USERNAME=#####`

## Starting the application

In it's current state, the application is not running on a server so it must be run on `localhost`.

We recommend cloning and accessing the repo through [GitHub Desktop](https://desktop.github.com/).

Once you have the repo...

> Open the repo in whatever IDE you choose to use

> To download all dependencies needed for frontend, open a terminal and run:

```shell
cd my-app
npm install
```

> To download all dependencies needed for backend, open a terminal and run:

```shell
cd api
npm install
```

> ???To seed the database with initial data, first install ts-node if it’s not already installed:

```shell
npm install -g ts-node
```

> ???Then run the script using ts-node:

```shell
ts-node src/scripts/seedDatabase.ts
```

> Upon completion, open a terminal and run the following to start the backend server:

```shell
cd api
npx tsx src/app.ts
```

> In another terminal, run the following to start the frontend server:

```shell
cd my-app
ng serve
```

> Make sure you have your MongoDB server running as well:

```shell
brew services start mongodb-community@7.0
```

> Now you can open the web page in your `localhost` browser.

> To stop the MongoDB server:

```shell
brew services stop mongodb-community@7.0
```

**More detailed breakdown of the application was provided to the client.**
