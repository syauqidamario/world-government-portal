from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

# Membuat file database lokal bernama "reverie.db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./reverie.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Mendefinisikan Struktur Tabel Database (Skema)
class Nation(Base):
    __tablename__ = "nations"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    ruler = Column(String)
    status = Column(String) # Active, Under Review, Revoked, Erased
    region = Column(String)
    tribute = Column(String) # Paid, Pending, Denied, NULL