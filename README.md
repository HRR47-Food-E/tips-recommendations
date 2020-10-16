# Project Name

> This repository hosts the tips-recommendations component of the Food-E project. Food-E is an interactive restaurant rating application, that has been optimized to perform well with millions of users and thousands of server requests per second. The server is built with Node.js and Express, and records are being stored using a PostgreSQL database and a Redis cache.

## Related Projects

  - https://github.com/HRR47-Food-E/photo-carousel-service
  - https://github.com/HRR47-Food-E/info-sidebar-service
  - https://github.com/HRR47-Food-E/similar-restaurants-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

## Usage

> 1. Install dependencies
```sh
npm i
```

> 2. Build webpack bundle
```sh
npm run build
```

> 3. Install and set up PostgreSQL (If PostgreSQL is already installed, skip to the command in this step that reads: "createdb zagattips")

```sh
brew doctor
```

```sh
brew update
```

```sh
brew install postgres
```

```sh
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
```

```sh
alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
```

```sh
alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
```

```sh
pg_start
```

```sh
createdb 'zagattips'
```

```sh
psql zagattips
```

```sh
\i psqlschema.sql;
```

> 4. Generate Data

- The data generation process writes data to three csv files
- You can open up three terminals and run the following commands simultaniously for faster data generation

```sh
npm run restaurant-gen
```

```sh
npm run article-gen
```

```sh
npm run feature-gen
```

> 5. Seed PostgreSQL database

```sh
npm run seed-psql
```

> 6. Start server

```sh
npm run server
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

## Development

## API

- How to make API calls to my service

## GET

- The following will makes requests for restaurant data, data for related articles, and data for related features
- These calls will return an object with the associated data

```sh
/api/tips/:id
/api/articles/:id
/api/features/:id
```

## POST

- The following route will add a restaurant, with associated articles and features, to the database

```sh
/api/restaurant
```

- The data should be in the following form

```sh
{
   "restaurant": {
       "restaurant_name": "name",
       "dish_name1": "dishName1",
       "dish_image1": 1,
       "dish_name2": "dishName2",
       "dish_image2": 2,
       "dish_name3": "dishName3",
       "dish_image3": 3,
       "tip": "tip"
   },
   "articles": [
       {
           "title": "article1Title",
           "image": 4
       }
   ],
   "features": [
       {
           "title": "feature1Name"
       }
   ]
}
```

- This will return a status code of 200 if the restaurant was added to the database, and 500 if there was an error

## PUT

- The following route will allow you to change the restaurant data for the specified id number

```sh
/api/restaurant/:id
```

- The new data should be in the following form

```sh
{
   "restaurant": {
       "restaurant_name": "newName",
       "dish_name1": "newDishName1",
       "dish_image1": 1,
       "dish_name2": "newDishName2",
       "dish_image2": 2,
       "dish_name3": "newDishName3",
       "dish_image3": 3,
       "tip": "newTip"
   }
}
```

- This will return a status code of 200 if the restaurant was updated in the database, and 500 if there was an error

## DELETE

- The following route will delete a restaurant and all associated data corresponding to the specified id number

```sh
/api/restaurant/:id
```

- This will return a status code of 200 if the restaurant was deleted from the database, and 500 if there was an error

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

