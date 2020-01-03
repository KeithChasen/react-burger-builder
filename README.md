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

- If we're about to use firebase hosting let's install its tools
#### `npm install -g firebase-tools` 

- login to your google account
#### `firebase login`

- init firebase project
#### `firebase init`

- Select Hosting option by pressing space
- select existing project
- type "build" for public directory
- type "y" for configure as a single-page app
- overwrite build/index.html? - NO

#### `firebase deploy`
That will return you a url of your app
