# FlipKartAI - AI-Powered E-commerce Clone

A full-stack e-commerce application inspired by Flipkart, featuring a modern React frontend and an AI-powered smart search backend.

## 🚀 Features

- **AI Smart Search**: Natural language processing using OpenRouter (Gemini 2.0 Flash) to filter products intelligently (e.g., "gaming phone under 15k").
- **Dynamic Product Grid**: 60+ products across Electronics, Footwear, Clothing, and Accessories.
- **Real-Time Cart**: Add/remove items with instant total price calculation.
- **Premium Checkout UI**: Custom success overlay with animated feedback upon order placement.
- **Descriptive Images**: Product images are dynamically generated based on category and brand description for high visual relevance.
- **Responsive Design**: Fully mobile-responsive layout with modern glassmorphism aesthetics.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Vanilla CSS, Lucide-React Icons, Axios.
- **Backend**: Node.js, Express, Dotenv, Axios.
- **AI Service**: OpenRouter API.

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/KalvaSrilaxmi/Flipkart_Clone.git
cd Flipkart_Clone
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
OPENROUTER_API_KEY=your_api_key_here
PORT=5000
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🚀 Deployment (Render)

### 1. Backend (Web Service)
- **Repo**: `Flipkart_Clone`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Env Vars**: 
    - `OPENROUTER_API_KEY`: Your key.
    - `PORT`: 5000 (optional, Render provides this).

### 2. Frontend (Static Site)
- **Repo**: `Flipkart_Clone`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Env Vars**:
    - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com/api`).

Try typing these into the search bar:
- "best gaming phone under 15000"
- "blue t-shirt for summer"
- "running shoes for gym"
- "electronics over 50000"

## 📝 License
This project is for educational purposes.
