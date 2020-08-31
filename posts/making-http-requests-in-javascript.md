---
title: 'Making HTTP requests in Javascript'
description: 'Three differentes ways to make requests in javascript'
date: 'August 31, 2020'
---

# Making HTTP requests in Javascript

We'll make HTTP requests in three differents ways.

## XMLHttpRequest (XHR).

- The "original" way of sending requests via JS"
- Does not support promises, so... lots of callbacks!
- Clunky syntax that I find difficult to remember!

Here's an example this API:

```javascript
const request = new XMLHttpRequest();

request.addEventListener('load', function () {
  console.log('IT WORKED!');
  const data = JSON.parse(this.responseText);
  for (let user of data) {
    console.log(user);
  }
});

request.addEventListener('error', function (e) {
  console.log('Error', e);
});

request.open('GET', 'https://jsonplaceholder.typicode.com/users');

request.send();
```

The code above looks nasty, that's why the Fetch API was created, and also provides a more powerful and flexible feature set.

## Fetch

- The newer way of making requests via JS
- Supports promises!
- Not supported in Internet Explorer

```javascript
fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
  response
    .json()
    .then((users) => {
      for (let user of users) {
        console.log(user);
      }
    })
    .catch((err) => {
      console.log('Something went wrong', err);
    });
});
```

Refactoring to `async/await`:

```javascript
const fetchUsers = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await data.json();
  for (let user of users) {
    console.log(user);
  }
};

fetchUsers();
```

That looks one hundred times better.

## AXIOS

- A library for making HTTP requests

Before running the code, you must include the axios library into your work environment, for example, if you have an HTML file, you can include it inside it.

`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`

```javascript
axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    for (let user of response.data) {
      console.log(user);
    }
  })
  .catch((err) => {
    console.log('Something went wrong', err);
  });
```

With async/await:

```javascript
const fetchUsers = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  for (let user of data) {
    console.log(user);
  }
};
```
