# TuringStore

This project contains a set of Express.js REST APIs which are intented to serve as the backend of an online shopping store.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the requirements.

```bash
npm install 
```

## API Reference
All endpoints, inputs, and outputs are exactly as per [this](https://backendapi.turing.com/docs/) swagger documentation. 


## Usage

To  use this backend in production the following environment variables need to be set:

```bash

        "USERNAME": Mysql database username,
        "PASSWORD": Mysql database password,
        "DATABASE": Mysql database name,
        "HOST": Mysql database host,
        "FACEBOOKCLIENTID": Facebook Client Id (For FB Login),
        "FACEBOOKCLIENTSECRET": Facebook Client Seckert (For FB Login),
        "JWTSECRETKEY": To encrypt JWT Tokens,
        "STRIPEKEY": Stripe Key to take payments

```

With these in place we can start the prod server with:

```bash
npm start
```

The dev environment variables can be set in the file nodemon.json in root directory of this project.

The dev server can be run by the command:

```bash
npm run startdev
```