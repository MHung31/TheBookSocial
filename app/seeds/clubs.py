from app.models import db, Club, User,  environment, SCHEMA
from sqlalchemy.sql import text

def seed_clubs():
    for i in range(1, 5):
        club = Club(
           title=f"Club {i}",
           is_public = False,
           user_id = 1
           )
        db.session.add(club)
        user = User.query.get(1)
        user.members_clubs.append(club)
    db.session.commit()

def undo_clubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clubs"))

    db.session.commit()
