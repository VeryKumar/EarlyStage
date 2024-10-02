from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import anthropic
import uvicorn
import json
from typing import Union
import os
from dotenv import load_dotenv
import re

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://early-stage.vercel.app",
    "https://early-stage-git-main-verykumars-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Claude client
claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


class AppIdea(BaseModel):
    ideaDescription: str = ""
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
    5. Brief analysis (2-3 paragraphs). List other similar apps and explain how this app stands out (or doesn't).

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
        print('1 Response Object:', response)
        analysis_result_text = response.content[0].text.strip()
        print("2 Response text:", analysis_result_text)
        
        # Remove any control characters from the response
        analysis_result_text = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', analysis_result_text)
        
        # Extract JSON from the response
        json_match = re.search(r'\{.*\}', analysis_result_text, re.DOTALL)
        if json_match:
            analysis_result_text = json_match.group(0)
        else:
            raise ValueError("No valid JSON found in the response")
        
        print("3 Cleaned response text:", analysis_result_text)
        
        analysis_result = json.loads(analysis_result_text)
        print("4 Parsed JSON:", analysis_result)
        return JSONResponse(content=analysis_result)
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", str(e))
        print("Problematic text:", analysis_result_text)
        raise HTTPException(status_code=500, detail=f"Invalid JSON: {str(e)}")
    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

# ... (additional routes and error handling)
def start():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    start()
    