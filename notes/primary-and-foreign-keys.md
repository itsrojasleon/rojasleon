---
title: 'Primary and Foreign Keys in SQL'
description: 'Some notes with primary and foreign keys in sql'
date: 'November 02, 2020'
author: 'rojasleon'
---

# Primary and Foreign Keys in SQL

## Primary Keys

- Each row in every table has one primary key
- No other row in the same table can have the same value
- 99% of the time is called **"id"**
- Either an integer or a UUID
- Will never change

## Foreign Keys

- Rows only have this if they belong to another record
- Many rows in the same table can have the same foreign key
- Name varies, usually called something like **"xyz_id"**
- Exactly equal to the primary key of the referenced row
- Will change if the relationship changes
