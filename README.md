# MovieFlex

MovieFlex is a full-stack single-page web application for streaming movies, built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS. This project includes features such as movie pagination, searching, categorization, sorting, and authentication via Google and email/password using Firebase.

## Features

- **Movie Listings**: Browse a diverse collection of movies with detailed information.
- **Search and Filter**: Search for movies and filter results by category, genre, and more.
- **Movie Details**: View detailed information about each movie, including cast, director, and genre.
- **Pagination**: Navigate through movie listings with pagination controls.
- **Authentication**: Secure login with Google Authentication and Email/Password Authentication using Firebase.
- **Responsive Design**: Fully responsive design for an optimal viewing experience on both desktop and mobile devices.

## Installation

To get started with MovieFlex locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nrbnayon/movieflex.git
   cd movieflex
   ```

````

2. **Install Dependencies**


   **Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and add the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the Application**

   **Frontend**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## Usage

- **Access the Application**: Open your browser and navigate to `http://localhost:5173` to view the application.
- **Login/Signup**: Use Google Authentication or email/password to log in or sign up.
- **Browse Movies**: Navigate through the movie listings, use search and filters to find specific movies.
- **View Movie Details**: Click on any movie to see detailed information.
- **Logout**: Click on the logout button to sign out of your account.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase (Email/Password & Google Authentication)
- **Deployment**: Netlify (Frontend), Heroku or a similar service (Backend)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

1. **Fork the Repository**
2. **Create a New Branch**: `git checkout -b feature/your-feature`
3. **Commit Your Changes**: `git commit -am 'Add some feature'`
4. **Push to the Branch**: `git push origin feature/your-feature`
5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact me at [nrbnayon@gmail.com](mailto:nrbnayon@gmail.com).

---

**MovieFlex** - A modern movie streaming application with an intuitive interface and powerful features.
````
