---
title: 'Differences between Maps and Structs in Go'
description: 'Some differences with maps and structs using go'
date: 'April 21, 2021'
author: 'rojasleon'
---

# Differences between Maps and Structs in Go

### Map

- All keys must be the same type
- All values must be the same type
- Keys are indexed - we can iterate over them
- Use to represent a collection of related properties
- Don't need to know all the keys at compile time
- Reference type!

### Struct

- Values can be of different type
- Keys don't support indexing
- You need to know all the different fields at compile time
- Use to represent a "thing" with a lot of different properties
- Value type!
