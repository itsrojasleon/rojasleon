---
title: 'Public and Private access specifiers in Typescript'
description: 'Differences with the public and private access specifier in Typescript classes'
date: 'August 22, 2020'
---

# Public and Private access specifiers in Typescript

```typescript
class Car {
  public color: string;
  private year: number;

  constructor(color: string, year: number) {
    this.color = color;
    this.year = year;
  }

  public drive() {
    console.log('Driving');
  }
}

const car = new Car('blue', 2020);
```

In the previous code we have a class called `Car` with one public property called `color`, another private property called `year` and a public method `drive`. Long story short, if we have a private property or method we cannot use it outside of the class, only inside. But if we have a public property or method we can get it inside and also outside of the class.

If we try something like this:

```typescript
const car = new Car('blue', 2020);

car.color; // blue
car.year; // error
```

Allright, now the question is: Why should I care about mark a property or method as private or public, what's the point?

Well, to answer that question let's imagine you are an engineer who spend a lot of time building a class `Car`. You were very careful with the implementation and you're a hundred percent sure that is the correct solution.

What happens if for any reason another engineer arrive to your code and tries to call another methods.

Look at this code.

```typescript
class Car {
  public color: string;
  private year: number;

  constructor(color: string, year: number) {
    this.color = color;
    this.year = year;
  }

  public drive() {
    checkFluidLevels();
    putInGear();
    pressPedal();
    turnWheel();
  }

  public checkFluidLevels() {}
  public putInGear() {}
  public pressPedal() {}
  public turnWheel() {}
}

const car = new Car('blue', 2020);
```

What happens if someone else call methods in the incorrect way to drive a car.

```typescript
car.pressPedal();
car.putInGear();
car.checkFluidLevels();
```

Well he is going to break the entiere car. That's why you must mark a property or methods as private if you want someone else don't touch them.

The correct implementation of the car must look something like this:

```typescript
class Car {
  public color: string;
  private year: number;

  constructor(color: string, year: number) {
    this.color = color;
    this.year = year;
  }

  public drive() {
    checkFluidLevels();
    putInGear();
    pressPedal();
    turnWheel();
  }

  private checkFluidLevels() {}
  private putInGear() {}
  private pressPedal() {}
  private turnWheel() {}
}

const car = new Car('blue', 2020);

// Do you want to drive a car?
// Call the drive method which is public

car.drive();
```

And that's it.
Restrict some property or methods is super important, and that's your job as a engineer, you have to deal with that. Good luck!

#### Note

In typescript is not necessary to mark methods or properties as public, all of them are by default public.

```typescript
class Car {
  color: string;
  private year: number;

  constructor(color: string, year: number) {
    this.color = color;
    this.year = year;
  }

  drive() {
    checkFluidLevels();
    putInGear();
    pressPedal();
    turnWheel();
  }

  private checkFluidLevels() {}
  private putInGear() {}
  private pressPedal() {}
  private turnWheel() {}
}
```
