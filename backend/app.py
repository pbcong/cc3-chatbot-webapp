from fastapi import FastAPI
from pydantic import BaseModel
from utils import Chatbot, ContextRetriever
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Request and response models
class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

# RAG function (placeholder for your logic)
def rag_system(question: str) -> str:
    # Replace with your actual RAG logic
    chatbot = Chatbot()
    return chatbot.chat(question)

# Define an API route
@app.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    answer = rag_system(request.question)
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
