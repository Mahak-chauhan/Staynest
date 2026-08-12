# 🏡 StayNest

StayNest is a full-stack vacation rental platform where users can discover stays, create and manage listings, upload property images, search by location, leave reviews, and view listing locations on an interactive map.

The project was built using Node.js, Express.js, MongoDB, Mongoose, EJS, Bootstrap, Cloudinary, Leaflet, and OpenStreetMap.

## ✨ Features

### 👤 Authentication

* User signup and login
* Secure logout
* Protected routes
* Owner-based listing authorization

### 🏡 Listings

* Create new property listings
* Edit existing listings
* Delete listings
* View complete listing details
* Display property images
* Display price and location

### 🔎 Search

* Search listings by location
* Case-insensitive search
* Partial location matching
* Friendly no-results message
* Search query remains visible after searching

### ⭐ Reviews

* Add reviews to listings
* Give ratings from 1–5
* Display reviewer information
* Delete your own reviews

### 🗺️ Interactive Maps

* Automatic location geocoding using Nominatim
* Latitude and longitude stored in MongoDB
* Interactive Leaflet maps
* OpenStreetMap tiles
* Dynamic listing markers
* Listing information displayed in map popups

### ☁️ Image Uploads

* Property image uploads using Multer
* Cloudinary image storage
* Automatic old-image deletion when an image is replaced

### 📱 Responsive UI

* Bootstrap-based responsive design
* Mobile-friendly layouts
* Responsive listing cards
* Hover effects and polished UI elements

## 🛠️ Tech Stack

### Frontend

* EJS
* EJS-Mate
* Bootstrap 5
* CSS
* Leaflet.js

### Backend

* Node.js
* Express.js
* Mongoose
* Passport.js
* Express Session
* Method Override
* Connect Flash
* Axios

### Database

* MongoDB
* MongoDB local database

### External Services

* Cloudinary — image storage
* Nominatim — location geocoding
* OpenStreetMap — map tiles

## 📂 Project Structure

```text
StayNest/
│
├── cloudConfig/
│   └── cloudConfig.js
│
├── data/
│   └── listings.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   └── css/
│       └── style.css
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   ├── edit.ejs
│   ├── home.ejs
│   ├── listings.ejs
│   ├── new.ejs
│   └── show.ejs
│
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mahak-chauhan/Staynest.git
```

### 2. Move into the project directory

```bash
cd Staynest
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

Add your required Cloudinary and application credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

Do not upload your `.env` file to GitHub.

### 5. Start MongoDB

Make sure MongoDB is running locally.

The application uses the local StayNest database:

```text
mongodb://127.0.0.1:27017/staynest
```

### 6. Start the application

```bash
node app.js
```

The application runs on:

```text
http://localhost:3000
```

## 🔐 Environment Variables

The application uses environment variables for sensitive credentials.

Example:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

Never commit real credentials to GitHub.

## 🗺️ How the Map Works

When a listing is created, StayNest sends the provided location to the Nominatim geocoding service.

```text
User enters location
        ↓
Nominatim
        ↓
Latitude + Longitude
        ↓
MongoDB
        ↓
GeoJSON Point
        ↓
Leaflet Map
        ↓
Listing Marker
```

The coordinates are stored in the listing document as:

```js
geometry: {
    type: "Point",
    coordinates: [longitude, latitude]
}
```

## 🔎 How Search Works

Users can search listings by location.

For example:

```text
/listings?location=Bengalore
```

The backend uses MongoDB regular expressions to perform case-insensitive matching.

```text
User searches location
        ↓
Express receives query
        ↓
MongoDB filters listings
        ↓
Matching listings displayed
```

## 📸 Main Application Flow

```text
Signup / Login
      ↓
Explore Listings
      ↓
Search by Location
      ↓
View Listing
      ↓
View Map
      ↓
Leave Review
      ↓
Manage Own Listings
```

## 🧪 Tested Features

The final project was tested for:

* Signup
* Login
* Logout
* Protected routes
* Listing creation
* Listing editing
* Listing deletion
* Image uploading
* Location geocoding
* Interactive maps
* Location search
* No-result handling
* Reviews
* Review deletion
* Responsive layout

## 🚀 Future Improvements

Possible future improvements include:

* Advanced filters for price and categories
* Rating-based filtering
* Wishlist functionality
* Booking and reservation system
* Payment integration
* User profile pages
* Admin dashboard
* Better image galleries
* Production deployment
* Cloud-hosted MongoDB
* Improved map-based listing discovery

## 👨‍💻 Author

**Mahak Chauhan**

GitHub:
https://github.com/Mahak-chauhan

## 📄 License

This project is created for learning, portfolio, and educational purposes.
