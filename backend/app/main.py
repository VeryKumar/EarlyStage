from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
import anthropic
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from typing import Union
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Claude client
claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
#test

class AppIdea(BaseModel):
    ideaDescription: str
    appName: str = ""
    category: str = ""

class AnalysisResult(BaseModel):
    marketPotential: Union[int, float]
    technicalComplexity: Union[int, float]
    uniqueness: Union[int, float]
    overallScore: Union[int, float]
    analysis: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the App Idea Analyzer API"}

@app.get("/favicon.ico")
def favicon():
    return Response(status_code=204)

@app.post("/analyze-idea", response_model=AnalysisResult)
async def analyze_idea(app_idea: AppIdea):
    # Construct prompt for Claude
    
    system_prompt = """You are an AI agent that analyzes app ideas and provides a detailed analysis including:
    1. Market potential (score 1-10)
    2. Technical complexity (score 1-10)
    3. Uniqueness (score 1-10)
    4. Overall score (average of above scores)
    5. Brief analysis (2-3 paragraphs)

    Format the response as JSON with keys: marketPotential, technicalComplexity, uniqueness, overallScore, analysis
    """
    
    prompt = f"""\n\nHuman: Analyze the following app idea:

    App Name: {app_idea.appName}
    Category: {app_idea.category}
    Description: {app_idea.ideaDescription}


    Format the response as JSON with keys: marketPotential, technicalComplexity, uniqueness, overallScore, analysis

\n\nAssistant:"""

    try:
        response = claude.messages.create(
            model="claude-3-5-sonnet-20240620",
            temperature=0.0,
            max_tokens=4000,
            system=system_prompt,
            messages=[       {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt
                }
            ]
        },
                      ],
            # max_tokens_to_sample=1000,
        )
        
        # Parse Claude's response
        print('1', response)
        print('2', response.content[0].text.strip())
        analysis_result_text = response.content[0].text.strip()
        print("Response text:", analysis_result_text)
        start_index = analysis_result_text.index("{")
        end_index = analysis_result_text.rindex("}") + 1
        analysis_result_text = analysis_result_text[start_index:end_index]
        print("Response text after slicing:", analysis_result_text)
        analysis_result = AnalysisResult(**json.loads(analysis_result_text))
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ... (additional routes and error handling)
def start():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    start()
    