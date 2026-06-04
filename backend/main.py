from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

# Import dari file database.py yang baru kita buat
from database import SessionLocal, engine, Base, Nation

# Inisialisasi/Buat tabel di database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="World Government API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency untuk membuka dan menutup koneksi database setiap kali ada request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    username: str
    password: str

# Skema untuk menerima update data dari React
class NationUpdate(BaseModel):
    status: str
    tribute: str

# Skema untuk membuat data kerajaan baru
class NationCreate(BaseModel):
    id: str
    name: str
    ruler: str
    status: str
    region: str
    tribute: str

# ----------------- ENDPOINTS -----------------

@app.post("/api/admin/login")
def admin_login(request: LoginRequest):
    if request.username == "cipher_pol_0" and request.password == "absolute_justice":
        return {"access_token": "wg_classified_jwt_token_12345", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Kredensial tidak valid.")

@app.get("/api/admin/classified-data")
def get_classified_data(token: str):
    if token != "wg_classified_jwt_token_12345":
        raise HTTPException(status_code=403, detail="Akses ilegal.")
    return {"target": "Lulusia Kingdom", "status": "Erased from history"}

# --- ENDPOINT DATABASE BARU ---

# 1. Mengambil semua data kerajaan (Bisa diakses publik/React)
@app.get("/api/nations")
def get_nations(db: Session = Depends(get_db)):
    nations = db.query(Nation).all()
    
    # Jika database masih kosong, kita isi dengan data awal (Seeding)
    if not nations:
        initial_data = [
            Nation(id="alabasta", name="Alabasta Kingdom", ruler="Nefertari Family", status="Under Review", region="Grand Line", tribute="Paid"),
            Nation(id="dressrosa", name="Dressrosa", ruler="Riku Dold III", status="Active", region="New World", tribute="Paid"),
            Nation(id="lulusia", name="Lulusia Kingdom", ruler="King Seki", status="Erased", region="Grand Line", tribute="NULL")
        ]
        db.add_all(initial_data)
        db.commit()
        nations = db.query(Nation).all()
        
    return nations

# 2. Mengubah status kerajaan (Hanya untuk Admin)
@app.put("/api/admin/nations/{nation_id}")
def update_nation(nation_id: str, nation_data: NationUpdate, token: str, db: Session = Depends(get_db)):
    # Verifikasi token keamanan
    if token != "wg_classified_jwt_token_12345":
        raise HTTPException(status_code=403, detail="Akses ditolak. Token tidak valid.")
    
    # Cari kerajaan di database
    db_nation = db.query(Nation).filter(Nation.id == nation_id).first()
    if not db_nation:
        raise HTTPException(status_code=404, detail="Target kerajaan tidak ditemukan di database.")
    
    # Update data
    db_nation.status = nation_data.status
    db_nation.tribute = nation_data.tribute
    db.commit()
    db.refresh(db_nation)
    
    return {"message": "Data berhasil dimanipulasi", "data": db_nation}

# 3. Menambah Kerajaan Baru (Create)
@app.post("/api/admin/nations")
def create_nation(nation: NationCreate, token: str, db: Session = Depends(get_db)):
    if token != "wg_classified_jwt_token_12345":
        raise HTTPException(status_code=403, detail="Akses ditolak.")
    
    # Cek apakah ID sudah ada
    db_nation = db.query(Nation).filter(Nation.id == nation.id).first()
    if db_nation:
        raise HTTPException(status_code=400, detail="ID Kerajaan sudah terdaftar di database.")
    
    # model_dump() adalah standar Pydantic v2 untuk mengubah objek ke dictionary
    new_nation = Nation(**nation.model_dump()) 
    db.add(new_nation)
    db.commit()
    db.refresh(new_nation)
    return {"message": "Kerajaan berhasil ditambahkan", "data": new_nation}

# 4. Menghapus Kerajaan Secara Permanen (Delete)
@app.delete("/api/admin/nations/{nation_id}")
def delete_nation(nation_id: str, token: str, db: Session = Depends(get_db)):
    if token != "wg_classified_jwt_token_12345":
        raise HTTPException(status_code=403, detail="Akses ditolak.")
        
    db_nation = db.query(Nation).filter(Nation.id == nation_id).first()
    if not db_nation:
        raise HTTPException(status_code=404, detail="Target tidak ditemukan.")
        
    db.delete(db_nation)
    db.commit()
    return {"message": "Data kerajaan dihapus secara permanen (Buster Call)."}