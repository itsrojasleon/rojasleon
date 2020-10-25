---
title: 'Rules for storing Numerical Data Types in SQL'
description: 'Rules for storing numbers in a SQL table'
date: 'October 25, 2020'
---

# Rules for storing Numerical Data Types in SQL

Right now I'm learning SQL with Postgres and I decided to create a small blog helper to consult it every time I need it.
It consists in annotate or mark a column inside a table with the correct numeric data type. That's it.

### Numeric Types Fast Rules

| Example                                                                              | Case                                                                                    |                                Solution |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------: |
|                                                                                      | 'id' column of any table                                                                |           Mark the column as **serial** |
|                                                                                      | Need to store a number without a decimal                                                |          Mark the column as **integer** |
| Bank balance, grams of gold, scientific calculations                                 | Need to store a number **with a decimal and this data needs to be accurate**            |          Mark the column as **numeric** |
| Kilograms of trash in a landfill, liters of waters in a lake, air pressure in a tire | Need to store a number **with a decimal and the decimal doesn't make a big difference** | Mark the column as **double precision** |
