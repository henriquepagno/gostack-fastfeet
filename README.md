<h1 align="center">
   Fastfeet - A delivery managing company
</h1>

<p align="center">
<img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/henriquepagno/gostack-fastfeet?color=7159C1">
<img alt="Made by Henrique Pagno de Lima" src="https://img.shields.io/badge/made%20by-Henrique Pagno de Lima-%20?color=7159C1">
<img alt="Project top programing language" src="https://img.shields.io/github/languages/top/henriquepagno/gostack-fastfeet?color=7159C1">
</p>
<p align="center">
  <a href="https://www.linkedin.com/in/henrique-pagno-de-lima/?locale=en_US" target="_blank" >
    <img alt="Linkedin - Henrique Pagno" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
  </a>
</p>

<p>
  Fastfeet is a delivery manage app on which the company can control deliveries, deliverymen and recipients.
  The application is divided in three modules:
  <ul>
    <li>Backend developed in NodeJS</li>
    <li>Web application developed in ReactJS
      <br>
      It's used as an administration app, where the company can see and manage all deliveries, deliverymen and recipients.
    </li>
    <li>Mobile application developed in React Native
      <br>
      It's used by each deliveryman to manage their respective deliveries, allowing them to register problems, withdrawals and confirmations.
    </li>
  </ul>
</p>
<p>
  This app was built as the <a href="https://rocketseat.com.br/gostack">Rocketseat's Bootcamp</a> final project.
</p>
<br>

<p align="center">
  <img src="/screenshots/fastfeet_web.gif" alt="Web"/>
</p>

<p align="center">
  <img src="/screenshots/fastfeet_mobile.gif" alt="Mobile"/>
</p>

<br>

<h3 align="center">
  Technologies
</h3>

This project was developed with the following technologies:

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [ReactJS](https://reactjs.org/)
-   [React Native](https://facebook.github.io/react-native/)
-   [Redux](https://redux.js.org/)
-   [Redux-Saga](https://redux-saga.js.org/)
-   [Redux-persist](https://github.com/rt2zz/redux-persist)
-   [Styled-components](https://www.styled-components.com/)
-   [React Navigation](https://reactnavigation.org/)
-   [JWT](https://jwt.io/)
-   [Immer](https://github.com/immerjs/immer)
-   [Axios](https://github.com/axios/axios)
-   [React-icons](https://react-icons.netlify.com/)
-   [React-toastify](https://github.com/fkhadra/react-toastify)
-   [Reactotron](https://infinite.red/reactotron)
-   [Polished](https://polished.js.org/)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Date-fns](https://date-fns.org/)
-   [Multer](https://github.com/expressjs/multer)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [React Native Camera](https://react-native-community.github.io/react-native-camera/)

<h3 align="center">
Executing the Application
</h3>

### Requirements

To run the application you will need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) 

I strongly recommend using [Docker](https://www.docker.com/) to run the databases.
<br>
If you decide to use Docker, follow this steps to install and run the docker images.

```bash
# install Redis image
docker run --name imageName -p 6379:6379 -d -t redis:alpine

# install Postgres image (if you don't specify an username it will be postgres by default)
docker run --name imagename -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# start Redis
docker start imageName

# start Postgres
docker start imageName

```
#### Backend
Now clone the repository and install the dependencies.
```bash
# to clone the repository
git clone https://github.com/henriquepagno/gostack-fastfeet.git

# go into the backend folder
cd backend

#install the backend dependencies
yarn

```
In order to connect to the database, you'll need to enter the access informations into a .env file, based on a .env.example file that is provided in the backend folder, change the variables according to your environment.
```bash
# run migrations
yarn sequelize db:migrate

# run seeds
yarn sequelize db:seed:all

# run api
yarn dev & yarn queue
```
#### Frontend

```bash
# in another tab of the terminal install the frontend dependencies and run it 
cd frontend

yarn

yarn start
```

To connect to the application you'll use the user that was created in the seed file:
```bash
user: admin@fastfeet.com
password: 123456
```

#### Mobile
The mobile module was developed and tested in Android. So its usage in iOS is not guaranteed.

```bash
cd mobile

# install the dependencies
yarn

# install the app into the device
react-native run-android

# run the app
react-native start
```

To connect to the mobile application you'll use the id of each deliveryman.

If you want to use Reactotron change the IP in the Reactotron config file to your machine's IP.

[ReactotronConfig](https://github.com/henriquepagno/gostack-fastfeet/blob/master/mobile/src/config/ReactotronConfig.js)
```javascript
  .configure({ host: '192.168.1.20' })
```

