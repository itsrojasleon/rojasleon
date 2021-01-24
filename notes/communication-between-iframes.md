---
title: 'Communication between iframes'
description: 'How to communicate stuff between a parent element to a iframe child'
date: 'January 24, 2021'
author: 'rojasleon'
---

# Communication between iframes

<!-- What I mean with communication between iframes? -->

Let's assume we're using [create-react-app](https://create-react-app.dev/docs/getting-started/) and we've got two html files within the public folder. One is the main file and the other is just another file with some random text.

```html
<!-- public/index.html -->
<html>
<head></head>
<body>
  <div id="root"></div>
</body>
</html>
```

```html
<!-- public/test.html -->
<html>
<head></head>
<body>
  <h1>Hello</h1>
</body>
</html>
```
If we add the test.html file as a iframe jsx element we can see the `Hello` getting displayed on the screen.

```javascript
// index.js

// Some imports

const App = () => {
  return (
    <>
      {/* Some elements */}
      <iframe src="/test.html" title="test" />
    </>
  )
}
```

Now we can communicate data between those two pages.

To communicate from the parent to the child it would be like this:

```javascript
// index.html context
window.color = 'red';

// test.html context
parent.color; // -> 'red'
```

The `parent` keyword is the reason of the accessibility

And in the other hand, to communicate data from the child to the parent would be something like this:

```javascript
// test.html context
window.car = 'tesla';

// index.html context
document.querySelector('iframe').contentWindow.car; // -> tesla
```
