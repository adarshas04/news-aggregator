<h1 align="center">Welcome to news-aggregator-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> News API for Users

## Prerequisites

- node >= 18.0.0

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Run tests

```sh
npm test
```

## API Reference


### User Registration
```http
POST /users
```

#### Request Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `name`    | `string` | **Required.** Name of the user         |
| `username`| `string` | **Required.** Username of the user     |
| `email`   | `string` | **Required.** Email of the user        |
| `newsPreferences`| `string[]` | **Required.** News preferences of the user|
| `password`| `string` | **Required.** Password of the user|


### User Login
```http
POST /users
```

#### Request Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `username`    | `string` | **Required.** Username with which account was registered|
| `password`    | `string` | **Required.** Password used to register the account|


### News Preferences
```http
GET /users/preferences
```

#### Request Headers
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `authorization`    | `string` | **Required.** Authorization token generated for the user on login (Preceed with `Bearer `)|

#### Response Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `newsPreferences`| `string[]` | List of the news preferences provided by the user.|

### News Preferences
```http
GET /users/preferences
```

#### Request Headers
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `authorization`    | `string` | **Required.** Authorization token generated for the user on login (Preceed with `Bearer `)|

#### Request Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `newsPreferences`    | `string` | **Required.** List of news preferences to be updated for the user|

#### Response Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `message`| `string` | Success/error message|
| `newsPreferences`| `string[]` | List of the news preferences provided by the user.|

### Fetch News based on preferences
```http
GET /news
```

#### Request Headers
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `authorization`| `string` | **Required.** Authorization token generated for the user on login (Preceed with `Bearer `)|

#### Response Body
| Parameter | Type     | Description                            |
| :-------- | :---     | :--------------------------------------|
| `news`| `string[]` | List of the news fetched based on the preferences provided by the user.|


## Postman collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://null.postman.co/collection/8127230-212c52df-d3c5-4a93-a5b9-de164c83ba77?source=rip_markdown)


## Author

👤 **Adarsh Singh**

* Github: [@adarshas04](https://github.com/adarshas04)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_