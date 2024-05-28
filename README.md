https://mern-shop-frontend.onrender.com
```markdown


![screencapture-localhost-5173-admin-dashboard-2024-05-24-17_55_37](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/15e07a20-9aa1-4719-b070-23230ed22ff0)
![iPhone-13-PRO-localhost](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/8e37407a-f794-4ec7-94e6-34c70f07477d)
![iPhone-13-PRO-localhost (4)](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/20c972be-1ec4-4498-8d33-b060f0701172)
![iPhone-13-PRO-localhost (3)](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/2827ab40-480b-4311-ad7b-bf9bc26ea7c4)
![iPhone-13-PRO-localhost (2)](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/e9d60049-921e-4c2b-b2cb-be051b5aa353)
![iPhone-13-PRO-localhost (1)](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/669a3adf-9e47-4f9e-9e8b-0c5850964565)
![screencapture-localhost-5173-search-2024-05-24-17_55_08](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/d2e99d46-1f06-4689-832c-7e3076dcb7bd)
![screencapture-localhost-5173-admin-product-2024-05-24-17_55_54](https://github.com/AliHamza0007/Mern-Shop-Frontend/assets/141808379/39bf4b97-c411-4216-9c99-ce8c74813f21)

# MERN Shop

MERN Shop is a web application built with React.js for the frontend, utilizing Vite as the build tool. It integrates Stripe for payment processing, Firebase for authentication (including Google login), and MongoDB as the database for storing product data. 

## Features

- **React.js with Redux Toolkit**: Utilizes Redux Toolkit for state management.
- **Firebase Authentication**: Implements Firebase authentication for user management, including Google login.
- **Stripe Integration**: Allows users to make payments securely using Stripe.
- **MongoDB Database**: Stores product data in MongoDB for CRUD operations.
- **RTK Query**: Utilizes Redux Toolkit Query for efficient API calls.
- **CRUD Operations**: Full CRUD functionality for managing products.
  
## Tech Stack

- **Frontend**:
  - React.js
  - Vite
  - Redux Toolkit
  - Firebase Authentication
  - Stripe
  - RTK Query

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mern-shop.git
   ```

2. Install dependencies:
   ```
   cd mern-shop
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Enable Firebase Authentication and Google login.
   - Obtain Firebase configuration credentials.

4. Set up Stripe:
   - Create a Stripe account.
   - Obtain Stripe API keys.

5. Set up MongoDB:
   - Create a MongoDB database.
   - Obtain MongoDB connection string.

6. Create environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
     REACT_APP_API_BASE_URL=http://localhost:8000/api
     ```

7. Run the frontend:
   ```
   npm start
   ```

8. Run the backend:
   ```
   npm run server
   ```

9. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Make sure to replace placeholders like `yourusername`, `your_firebase_api_key`, `your_stripe_public_key`, etc., with your actual credentials and information. Additionally, provide detailed setup instructions specific to your project if needed.
