# EquiSports

EquiSports is an online sports equipment store offering a wide range of sports accessories, including gear and apparel, for various sports disciplines. The website allows customers to browse, purchase, and review products. It supports user authentication and product management, with a responsive design suitable for mobile, tablet, and desktop devices.

### Live Site:
[EquiSports](https://equi-sports-shakir.vercel.app/)

### Features:
- **User Authentication**: Users can log in and register with email/password or Google authentication. After logging in, users can view and manage their equipment.
- **Product Management**: Admin users can add, view, update, and delete products. All product details, including name, category, price, and description, are stored in MongoDB.
- **Private Routes**: Several pages such as Add Equipment, View Details, and My Equipment List are private routes accessible only to logged-in users.
- **Responsive Design**: The site is fully responsive across devices, providing a smooth experience on mobile, tablet, and desktop.
- **Product Sorting**: Products can be sorted by price (ascending or descending).
- **Dark/Light Theme Toggle**: Users can toggle between dark and light themes.
- **Toast Notifications**: Custom error and success messages are displayed using SweetAlert2.
- **Loading Spinner**: A loading spinner is shown while data is being fetched from the server.
- **Lottie Animations**: Lottie animations are used to enhance user experience.
- **React Tooltip**: Tooltips are used to display additional information on hover.
- **Categories**: Users can filter products by category.

### Technologies Used:
- **Frontend**: 
  - React
  - React Router DOM
  - Tailwind CSS
  - Lottie React
  - SweetAlert2
  - React Tooltip
  - React Awesome Reveal
  - Swiper
  - Firebase Authentication
  - React Icons
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - CORS middleware
  - dotenv for environment variable management
  - MongoDB Atlas for database hosting
- **Dev Tools**:
  - Vite (for bundling and development)
  - ESLint (for code linting)
  - DaisyUI (for UI components)

### Server-Side Code:
The server is built using Express.js, which connects to a MongoDB database via MongoDB Atlas. The database stores user data and product information, while the server provides APIs for CRUD operations on products and user data.

- **MongoDB**: Stores products, user details, and categories.
- **APIs**: 
  - `https://equi-sports-server-shakir.vercel.app/products`: Manage product data (GET, POST, PUT, DELETE).
  - `https://equi-sports-server-shakir.vercel.app/categories`: Fetch unique product categories.
  - `https://equi-sports-server-shakir.vercel.app/products/category/:category`: Fetch products filtered by category.
  - `https://equi-sports-server-shakir.vercel.app/users`: Manage user data (GET, POST).



