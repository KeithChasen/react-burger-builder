This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

# `Firebase rules`

```
{
  "rules": {
    "ingredients" : {
      ".read": true,
      ".write": true,
    },
    "orders" : {
            ".read": "auth != null",
            ".write": "auth != null",
            ".indexOn": ["userId"]
      }
  }
}
```

# `Building project`

- that command will create the "build" folder in the root
#### `npm run build` 

