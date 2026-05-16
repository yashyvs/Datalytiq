from dotenv import load_dotenv
from langchain_huggingface import ChatHuggingFace,HuggingFaceEndpoint
import os

load_dotenv()

model = HuggingFaceEndpoint(

    repo_id="Qwen/Qwen2.5-72B-Instruct",

    task="conversational",

    huggingfacehub_api_token=
    os.getenv(
        "HUGGINGFACEHUB_API_TOKEN"
    ),

    max_new_tokens=200,

    temperature=0.5
)

llm = ChatHuggingFace(
    llm=model
)