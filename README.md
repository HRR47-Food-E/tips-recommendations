# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

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

