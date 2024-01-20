from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="De", last_name="Mo", avatar="https://appliedpost.com/wp-content/uploads/2019/04/livedemo-1.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="mar", last_name="nie", avatar="https://iheartcraftythings.com/wp-content/uploads/2022/01/6-49.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="bob", last_name="bie", avatar="https://t4.ftcdn.net/jpg/06/24/89/75/240_F_624897595_ofLf2oLGj0HncCIx6w5n3gvaU6XiM46D.jpg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
