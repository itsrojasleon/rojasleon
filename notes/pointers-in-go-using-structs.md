---
title: 'Pointers in Go using structs'
description: 'Pointer operations using structs in Go'
date: '21 April, 2021'
author: 'rojasleon'
---

# Pointers in Go using structs

Pointers using structs

```go
package main

import "fmt"

type contactInfo struct {
	email   string
	zipCode int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	jim := person{
		firstName: "Jim",
		lastName:  "Harris",
		contactInfo: contactInfo{
			email:   "test@test.com",
			zipCode: 12121,
		},
	}

	jim.UpdateName("Jimmy")
	jim.Print()
}

func (pointerToPerson *person) UpdateName(name string) {
	(*pointerToPerson).firstName = name
}

func (p person) Print() {
	fmt.Println("%v+", p)
}
```

Gotchas using Pointers

```go
// We are not using any pointers and we're able to update the slice
// This is the same case using [slices, maps, channels, pointers, functions]
package main

import "fmt"

func main() {
  mySlice := []string{"Hi", "There"}

  updateSlice(mySlice)

  fmt.Println(mySlice)
}

func updateSlice(s []string) {
  s[0] = "Bye"
}
```

Use pointers to change these things in a function with these:

- int
- float
- string
- bool
- structs

Don't worry about pointers with these:

- slices
- maps
- channels
- pointers
- functions
