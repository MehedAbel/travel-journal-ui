# Setting A Basic React Application

This is a step-by-step instruction on how to set up a basic HTML5 document for a React Application


## 1. Creating The HTML Document

The root `div` will Render the React app. It's not required for the id be named **root**, it's a common practice, you can name it "blah" if you want.
It is important to know that this element serves as the mounting point for our React Application

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta, title -->
</head>
<body>
    <div id="root"></div>
</body>
</html>

```

## 2. Including React Libraries

For a React Application to function, we need to include two primary scripts:

**React:** The first script tag is the API, it contains most of the methods in React that we will use.

**React DOM:** The second script is the rendering layer, using eReact DOM. Both scripts are required.

```html
<script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
```


## 3. Writing the Code
The third script tag is where we write our code.

```html
<script>
    // Write your code here.
</script>
```    

*The order for the first two does not count, but the one where we write the code must be the last one.
** This is not for commercial usage just a showcase of how to add React.
