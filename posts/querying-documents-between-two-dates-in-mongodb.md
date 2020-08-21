---
title: 'Querying documents between two dates in mongoDB'
description: 'Retrieve documents in mongoDB using dates'
date: 'August 21, 2020'
---

# Querying documents between two dates in mongoDB

In this small tutorial we'll learn how to query documents between two dates from a mongo database using queries.

We can start creating our database in any mongo db provider, for example: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Once created let's connect to the db using the [mongo shell](https://docs.mongodb.com/manual/mongo/).

```shell
mongo "mongodb+srv://cluster0.zyz5y.mongodb.net/<database>" --username <username>
# In my case the name of my database is "test", so it looks something like this:
mongo "mongodb+srv://cluster0.zyz5y.mongodb.net/test" --username <username>
```

A prompt to add your password should appears, add it. Then we can create our first collection to add some dummy documents.

- Switch to your database

```shell
use test
```

- Create a collection named "blogs" or whatever name you want and insert some dummy documents.

```javascript
// You can use these documents to fill your database
db.blogs.insertMany([
  { title: 'title # 1', body: 'body # 1', createdAt: new Date('2020-01-01') },
  { title: 'title # 2', body: 'body # 2', createdAt: new Date('2020-02-02') },
  { title: 'title # 3', body: 'body # 3', createdAt: new Date('2020-03-03') },
  { title: 'title # 4', body: 'body # 4', createdAt: new Date('2020-04-04') },
  { title: 'title # 5', body: 'body # 5', createdAt: new Date('2020-05-05') },
  { title: 'title # 6', body: 'body # 6', createdAt: new Date('2020-06-06') },
  { title: 'title # 7', body: 'body # 7', createdAt: new Date('2020-07-07') },
  { title: 'title # 8', body: 'body # 8', createdAt: new Date('2020-08-08') },
  { title: 'title # 9', body: 'body # 9', createdAt: new Date('2020-09-09') },
  { title: 'title # 10', body: 'body # 10', createdAt: new Date('2020-10-10') }
]);
```

Working with dates can be really tricky, I'm assuming you have some background with mongo db, but that is not a problem, this example is going to be super easy to unsertand. Anyways here's a link to the official documentation for any trouble shooting. All we need to do is send the query and see the results.

```javascript
db.blogs.find({
  createdAt: { $gte: new Date('2020-01-01'), $lte: new Date('2020-02-01') }
});
```

We should see only one document.

- `$gte` -> `>=` -> greater than or equals
- `$lte` -> `<=` -> less than or equals

And that's it, that is one way to do that.
