# CC3 Chatbot

**Note: This project is still a work in progress.**

This project is a chatbot application designed to answer questions about the CC0003 course. It consists of a React frontend and a FastAPI backend.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm
- Python 3.x
- pip (Python package installer)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-repo/cc3-chatbot.git
   cd cc3-chatbot

   ```

2. **Install frontend dependencies**:

   ```sh
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:

   ```sh
   cd ../backend
   pip install -r requirements.txt
   ```

Configuration
Add your API key: Create a .env file in the backend directory and add your API key as OPENAI_API_KEY

### Running the Application

1. **Start the backend API**:

```sh
cd backend
python app.py
```

2. **Start the frontend**:

```sh
cd ../frontend
npm start
```
