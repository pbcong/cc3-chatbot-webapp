import os
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

class ContextRetriever():
    def __init__(self):
        load_dotenv(override=True)

        self.embedding = OpenAIEmbeddings(
                api_key=os.environ['OPENAI_API_KEY'])
        self.vectorDB = FAISS.load_local(
                "backend/resources/db", self.embedding, allow_dangerous_deserialization=True)
        self.retriever = self.vectorDB.as_retriever(
                search_kwargs={"k": 5})

    def search_chunks(self, query):
        search_result = self.retriever.invoke(query)
        context = []
        for r in search_result:
            context.append(r.page_content)

        instruction = "try to understand the userquery and answer based on the context given below:\n"
        return HumanMessage(content=f"{instruction}'context':{context}, 'userquery':{query}")
    
class Chatbot():
    def __init__(self):
        load_dotenv(override=True)
        self.retriever = ContextRetriever() 
        self.llm = ChatOpenAI(
                model="gpt-4o", api_key=os.environ['OPENAI_API_KEY'])

        persona = "You are a teaching assistant at for the course CC0003 at NTU."
        task = "your task is to answer student query about the Ethics and Civics in a Multicultural World."
        context = "the context will be provided based on the course information and notes along with the user query"
        condition = "If user ask any query beyond Ethics and Civics in a Multicultural World, tell the user you are not an expert of the topic the user is asking and say sorry. If you are unsure about certain query, say sorry and advise the user to contact the instructor at mail@gmail.com"

        sysmsg = f"{persona} {task} {context} {condition}"
        self.conversations = [SystemMessage(content=sysmsg)]
    
    def chat(self, query):
        # print(self.retriever.search_chunks(query))
        context = self.retriever.search_chunks(query)
        self.conversations.append(HumanMessage(content=query))  
        temp_message = self.conversations + [context]
        ai_message = self.llm.invoke(temp_message)
        ai_message = AIMessage(content=ai_message.content)
        self.conversations.append(ai_message)
        return ai_message.content
    
def test(query):
    chatbot = Chatbot()
    return chatbot.chat(query)

if __name__== "__main__":
    print(test("What is the course about?"))
    print(test("What is the course code?"))
    print(test("What is the course outline?"))
    print(test("What is the course structure?"))
    print(test("What is the course content?"))
    print(test("What is the course schedule?"))
    print(test("What is the course timing?"))
