from fastapi import FastAPI
from routes.cityRouter import router as countryRouter
from routes.weatherRouter import router as weatherRouter
from routes.favoritesRouter import router as favoritesRouter
from fastapi.middleware.cors import CORSMiddleware
from routes.atbashRouter import router as atbashRouter
import requests

import time
from fastapi import FastAPI, Request

app = FastAPI()


@app.middleware("http")
async def log_requests_and_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    formatted_process_time = f"{process_time:.4f}s"
    response.headers["X-Process-Time"] = formatted_process_time
    print(
        f"[{request.method}] {request.url.path} "
        f"| Status: {response.status_code} "
        f"| Took: {formatted_process_time}"
    )

    return response




origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],         
)

app.include_router(countryRouter)
app.include_router(weatherRouter)
app.include_router(favoritesRouter)
app.include_router(atbashRouter)


@app.get('/health')
def checkHealth():
    return {"status":"ok"}




if __name__== "__main__":
    print("run...")