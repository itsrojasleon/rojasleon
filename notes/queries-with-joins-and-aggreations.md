---
title: 'Queries with joins'
description: 'Queries with joins'
date: 'November 02, 2020'
author: 'rojasleon'
---

# Queries with joins

## Joins

- Produces values by merging together rows from different related tables
- Use a join _most times_ that you're asked to find data that involves multiple resources

| Notes on Joins                                                      |
| :------------------------------------------------------------------ |
| Table order between 'FROM' and 'JOIN' frequently makes a difference |
| We must give context if column names collide                        |
| Tables can be renamed using the 'AS' keyword                        |
| There are a few kinds of joins!                                     |

```sql
SELECT content, url
FROM comments
JOIN photos ON photos.id = comments.photo_id;
```

```sql
-- Will throw an error because there are two "id's"
SELECT id
FROM comments
JOIN photos ON photos.id = comments.photo_id;
```

### Four kinds of joins

#### Inner Join

Select all records from Table A and Table B where the join condition is met.

#### Left Join

Select all records from Table A, along with records from Table B for which the join condition is met (if at all)

#### Right Join

Select all records from Table B, along with records from Table A for which the join condition is met (if at all)

#### Full Join

Select all records from Table A and Table B, regardless of whether the join condition is met or not
