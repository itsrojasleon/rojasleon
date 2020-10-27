---
title: 'SQL Statements'
description: 'Some SQL Statements'
date: 'October 27, 2020'
author: 'rojasleon'
---

# SQL Statements

## Creating tables

```sql
CREATE TABLE cities (
  name VARCHAR(50),
  country VARCHAR(50),
  population INTEGER,
  area INTEGER
);
```

## Inserting data into a table

```sql
INSERT INTO cities (name, country, population, area)
VALUES
  ('Tokyo', 'Japan', 38505000, 1000),
  ('Delhi', 'India', 22125000, 2000);
```

## Retrieving data

```sql
SELECT * FROM cities; -- Select all columns
SELECT name, country FROM cities; -- Select some columns
```

### Math operators

| Operator |    Use    | Operator |      Use       |
| :------: | :-------: | :------: | :------------: |
|    +     |    Add    |    ^     |    Exponent    |
|    -     | Substract |   \|/    |  Square Root   |
|    \*    | Multiply  |    @     | Absolute value |
|    /     |  Divide   |    %     |   Remainder    |

```sql
SELECT name, population / area AS population_density -- name a new result
FROM cities;
```

### String Operators and Functions

|   Operator   |            Use            |   Operator   |                  Use                   |
| :----------: | :-----------------------: | :----------: | :------------------------------------: |
|    **ll**    |     Join two strings      | **LENGTH()** | Gives number of characters in a string |
| **CONCAT()** |     Join two strings      | **UPPER()**  |       Gives an upper case string       |
| **LOWER()**  | Gives a lower case string |

```sql
SELECT CONCAT(UPPER(name), ', ', UPPER(country)) AS location
FROM cities;
```

## Filtering Records

```sql
SELECT name
FROM cities
WHERE area > 1000;
```

### Comparison Math Operators

| Operator |                      Use                      |  Operator   |                     Use                      |
| :------: | :-------------------------------------------: | :---------: | :------------------------------------------: |
|  **=**   |             Are the values equal              |   **<=**    | Is the value on the left lesser or equal to? |
|  **>**   |       Is the value on the left greater?       |   **<>**    |          Are the values not equal?           |
|  **<**   |     Is the value value on the left less?      |   **!=**    |          Are the values not equal?           |
|  **>=**  | Is the value on the left greater or equal to? | **BETWEEN** |    Is the value between two other values?    |
|  **IN**  |        Is the value present in a list?        | **NOT IN**  |     Is the value not present in a list?      |

Compound "Where" Clauses

```sql
SELECT name, area
FROM cities
WHERE
  area NOT IN (3043, 8223)
  OR name = 'Delhi'
  OR name = 'Tokyo';
```

## Updating Rows

```sql
UPDATE cities
SET population = 39505000
WHERE name = 'Tokyo';
```

## Deleting Rows

```sql
DELETE FROM cities
WHERE name = 'Tokyo'
```
