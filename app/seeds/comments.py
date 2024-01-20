from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    for i in range(1, 20):
        comment = Comment(
           comment = f"This is my favorite part! {i}",
           user_id = 1,
           book_id = 1,
           visibility = "",
           book_location = f"{i*3+2}:{i*3+4}"
           )
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
