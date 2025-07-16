from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx

app = FastAPI()

@app.get("/api")
async def validate_username(request: Request):
    username = request.query_params.get("username")

    if not username:
        return JSONResponse({
            "status": "info",
            "message": "👋 Welcome to the Instagram Username Validator API.",
            "how_to_use": "Use ?username=your_username in the URL",
            "example": "/api?username=the_sword_70"
        })

    url = f"https://www.instagram.com/{username}/"

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})

        if resp.status_code == 200:
            return JSONResponse({
                "status": "success",
                "message": f"Username '{username}' is valid.",
                "username": username
            })
        elif resp.status_code == 404:
            return JSONResponse({
                "status": "fail",
                "message": f"Username '{username}' not found."
            })
        else:
            return JSONResponse({
                "status": "error",
                "message": "Unexpected response from Instagram.",
                "code": resp.status_code
            })

    except Exception as e:
        return JSONResponse({
            "status": "error",
            "message": "Request failed.",
            "error": str(e)
        })