from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="World Government API", version="1.0.0")

# Mengizinkan React (biasanya di localhost:5173) untuk berkomunikasi dengan API Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Skema data (Schema) untuk menerima request dari React
class LoginRequest(BaseModel):
    username: str
    password: str

# 1. Endpoint Public (Bisa diakses siapa saja)
@app.get("/api/public/bounties")
def get_public_bounties():
    return [{"name": "Straw Hat Luffy", "bounty": "3,000,000,000"}]

# 2. Endpoint Login (Menghasilkan Token)
@app.post("/api/admin/login")
def admin_login(request: LoginRequest):
    # Di produksi, ini akan mengecek kecocokan hash password di database
    if request.username == "cipher_pol_0" and request.password == "absolute_justice":
        return {
            "access_token": "wg_classified_jwt_token_12345", 
            "token_type": "bearer",
            "role": "Gorosei_Level"
        }
    
    raise HTTPException(status_code=401, detail="Kredensial tidak valid atau akses ditolak.")

# 3. Endpoint Protected (Butuh otorisasi)
@app.get("/api/admin/classified-data")
def get_classified_data(token: str):
    # Simulasi verifikasi token
    if token != "wg_classified_jwt_token_12345":
        raise HTTPException(status_code=403, detail="Akses ilegal ke data Pemerintahan Dunia.")
    
    return {"target": "Lulusia Kingdom", "status": "Erased from history"}