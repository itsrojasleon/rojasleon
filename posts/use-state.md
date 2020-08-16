---
title: 'useState Hook'
description: 'A simple explanation of how the useState hook works'
date: 'August 16, 2020'
---

# A simple explanation of how the useState hook works

_The `useState` hook returns s stateful value and a function to update it._

```javascript
const core = useState(initialState);
const state = core[0];
const setState = core[1];

// If we use Destructuring assignment it looks something like this
const [state, setState] = useState(initialState);
```

Let's create a quick example about an implementation and discuss the details. We're building a input element and we need to have full control over it.

- We need to be able to get the value of the input element
- We need to invoke a function when the value of the input changes
- We need to get the new value after the input changes.

We can do the above steps with the useState hook. Let's take a look at that implementation

```javascript
import React, { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState('');

  // A helper function to get the value within the input element and
  // retrieve it with setState
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      Here's what you're typing: <strong>{value}</strong>
    </>
  );
};
```

During subsequent re-renders, the first value returned by `useState` will always be the most recent state after applying updates. What is the meaning of the previous explanation? Let's add the following code to understand it.

```javascript
const MyComponent = () => {
  const [value, setValue] = useState('');
  const [historyList, setHistoryList] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setHistoryList([...historyList, event.target.value]);
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      Here's what you're typing: <strong>{value}</strong>
      <br />
      {historyList.map((list) => (
        <p key={list}>{list}</p>
      ))}
    </>
  );
};
```

You will see on the screen all of the previous states.

[Please see the official documentation for more information or to expand your knowledge in react](https://reactjs.org/).

[Here'e the code](https://codesandbox.io/s/usestate-tz7qo).
