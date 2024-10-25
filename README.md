# CraftShop

## [See the App!](https://craftshop-ih.netlify.app/)

![App Logo](./src//assets/images/logo.png)

## Description

CraftShop is a web designed for a single seller to post all their products with the option fro other people to make a user and comment on the products and buy them

#### [Client Repo here](https://github.com/r-ruizfer/CraftShop-frontend)

#### [Server Repo here](https://github.com/r-ruizfer/CraftShop-Backend)

## Backlog Functionalities

Upvote/Downvote system, report system, Delivery...

## Technologies used

CSS, React, JavaScript, Bootstrap, Cloudinary, Strpie, Passport

# Server Structure

## Models

User model

```javascript
{
    googleId: {type: String,unique: true},
    email: {type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true,},
    password: {type: String, required: function () {return !this.googleId;}},
    username: {type: String, required: [true, "username is required"], unique: true,},
    firstName: {type: String,},
    lastName: {type: String,},
    address: {type: String,},
    image: {type: String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",},
    isAdmin: {type: Boolean, default: false,},
    wishlistedItems: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
    }

```

Product model

```javascript
 {
  title: {
    type: String,
    required: [true, "Title is required."],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "a Descritpion is required."],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    get: (value) => Math.round(value * 100),
  },
  image: {
    type: String,
    required: [true, "you need to add an image"],
  },
  category: {
    type: String,
    required: [true, "you need at least one category"],
    enum: ["Prints", "Stickers", "Merchandising", "Painting"],
  },
}

```

Comment model

```javascript
{
  text: {
    type: String,
    required: [true, "Some text is required."],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
}
```

Payment model

```javascript
{
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete",
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                                             | Request Body                                 | Success status | Error Status | Description                                              |
| ----------- | ----------------------------------------------- | -------------------------------------------- | -------------- | ------------ | -------------------------------------------------------- |
| POST        | `/auth/signup`                                  | {name, email, password}                      | 201            | 400          | Registers the user in the Database                       |
| POST        | `/auth/login`                                   | {username, password}                         | 200            | 400          | Validates credentials, creates and sends Token           |
| GET         | `/auth/verify`                                  |                                              | 200            | 401          | Verifies the user Token                                  |
| GET         | `/auth/google`                                  |                                              | 200            | 401          | Authenticates with Passport Google OAuth 2.0             |
| GET         | `/auth/google/callback`                         |                                              | 200            | 401          | Authenticates with Passport Google OAuth 2.0             |
| GET         | `/auth/google/login`                            |                                              | 200            | 401          | Logs the User in with Passport Google OAuth 2.0          |
| GET         | `/user/admin`                                   |                                              | 200            | 401          | Shows Admin Data                                         |
| GET         | `/user/perfil`                                  |                                              | 200            | 401          | Shows Private User Info                                  |
| GET         | `/products`                                     |                                              | 200            | 400          | Show products in the DB, only titles , prices and images |
| GET         | `/products/search`                              |                                              | 200            | 400          | Show products matching the query                         |
| POST        | `/products`                                     | {title, image, description, price, category} | 201            | 400          | Creates a new product Document                           |
| GET         | `/products/:productId`                          |                                              | 200            | 400, 401     | Sends all product Details                                |
| PUT         | `/products/:productId`                          | {title, image, description, price, category} | 200            | 400, 401     | Edits product document                                   |
| DELETE      | `/products/:productId`                          |                                              | 200            | 401          | Deletes product document                                 |
| GET         | `/users/:id`                                    |                                              | 200            | 401          | Sends user profile details                               |
| PATCH       | `/users/:id`                                    |                                              | 200            | 400, 401     | Edits the user profile                                   |
| PATCH       | `/users/:id/products/:productId/addWishlist`    |                                              | 200            | 401          | Adds product to wishlist                                 |
| PATCH       | `/users/:id/products/:productId/removeWishlist` |                                              | 200            | 401          | Removes product from wishlist                            |
| GET         | `/productApi/:apiId`                            |                                              | 200            |
| 401         | Gets product details from API                   |
| POST        | `/comments`                                     | {text}                                       | 201            | 400          | Posts a comment on a product                             |
| DELETE      | `/comments/:commentId`                          |                                              | 201            | 400          | deletes a comment                                        |
| GET         | `/comments/products/:productId`                 |                                              | 201            | 400          | Show all comments on a product                           |
| GET         | `/comments/products/:productId`                 |                                              | 201            | 400          | Show all comments from a User                            |
| POST        | `/payments/create-payment-intent`               | {products}                                   | 201            | 400          | Creates a Payment intent                                 |
| PATCH       | `/payments/update-payment-intent`               | {clientSecret, paymentIntentId}              | 201            | 400          | Updates a Payment intent                                 |

## Links

### Collaborators

[Developer 1 name](https://github.com/anruiz-r)

[Developer 2 name](https://github.com/r-ruizfer)

### Project

[Repository Link Client](https://github.com/r-ruizfer/CraftShop-frontend)

[Repository Link Server](https://github.com/r-ruizfer/CraftShop-Backend)

[Deploy Link](https://craftshop-ih.netlify.app/)

### Slides

[Slides Link](www.your-slides-url-here.com)
