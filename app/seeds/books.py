from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    for i in range(1, 20):
        book = Book(
            title=f"Harry Potter{i}",
            author=f"JK Rowling{i}",
            content=f"Hagrid raised a gigantic fist and knocked three times on the castle door.\n The door swung open at once. A tall, black-haired witch in emerald-green robes stood there. She had a very stern face and Harry’s first thought was that this was not someone to cross.\n ‘The firs’-years, Professor McGonagall,’ said Hagrid. ‘Thank you, Hagrid. I will take them from here.’ She pulled the door wide. The Entrance Hall was so big you could have fitted the whole of the Dursleys’ house in it. The stone walls were lit with flaming torches like the ones at Gringotts, the ceiling was too high to make out, and a magnificent marble staircase facing them led to the upper floors.\n They followed Professor McGonagall across the flagged stone floor. Harry could hear the drone of hundreds of voices from a doorway to the right – the rest of the school must already be here – but Professor McGonagall showed the first-years into a small empty chamber off the hall. They crowded in, standing rather closer together than they would usually have done, peering about nervously.\nHagrid raised a gigantic fist and knocked three times on the castle door.\n The door swung open at once. A tall, black-haired witch in emerald-green robes stood there. She had a very stern face and Harry’s first thought was that this was not someone to cross.\n ‘The firs’-years, Professor McGonagall,’ said Hagrid. ‘Thank you, Hagrid. I will take them from here.’ She pulled the door wide. The Entrance Hall was so big you could have fitted the whole of the Dursleys’ house in it. The stone walls were lit with flaming torches like the ones at Gringotts, the ceiling was too high to make out, and a magnificent marble staircase facing them led to the upper floors.\n They followed Professor McGonagall across the flagged stone floor. Harry could hear the drone of hundreds of voices from a doorway to the right – the rest of the school must already be here – but Professor McGonagall showed the first-years into a small empty chamber off the hall. They crowded in, standing rather closer together than they would usually have done, peering about nervously.\nHagrid raised a gigantic fist and knocked three times on the castle door.\n The door swung open at once. A tall, black-haired witch in emerald-green robes stood there. She had a very stern face and Harry’s first thought was that this was not someone to cross.\n ‘The firs’-years, Professor McGonagall,’ said Hagrid. ‘Thank you, Hagrid. I will take them from here.’ She pulled the door wide. The Entrance Hall was so big you could have fitted the whole of the Dursleys’ house in it. The stone walls were lit with flaming torches like the ones at Gringotts, the ceiling was too high to make out, and a magnificent marble staircase facing them led to the upper floors.\n They followed Professor McGonagall across the flagged stone floor. Harry could hear the drone of hundreds of voices from a doorway to the right – the rest of the school must already be here – but Professor McGonagall showed the first-years into a small empty chamber off the hall. They crowded in, standing rather closer together than they would usually have done, peering about nervously.\nHagrid raised a gigantic fist and knocked three times on the castle door.\n The door swung open at once. A tall, black-haired witch in emerald-green robes stood there. She had a very stern face and Harry’s first thought was that this was not someone to cross.\n ‘The firs’-years, Professor McGonagall,’ said Hagrid. ‘Thank you, Hagrid. I will take them from here.’ She pulled the door wide. The Entrance Hall was so big you could have fitted the whole of the Dursleys’ house in it. The stone walls were lit with flaming torches like the ones at Gringotts, the ceiling was too high to make out, and a magnificent marble staircase facing them led to the upper floors.\n They followed Professor McGonagall across the flagged stone floor. Harry could hear the drone of hundreds of voices from a doorway to the right – the rest of the school must already be here – but Professor McGonagall showed the first-years into a small empty chamber off the hall. They crowded in, standing rather closer together than they would usually have done, peering about nervously.\n",
            preview= "https://m.media-amazon.com/images/I/71RVt35ZAbL._SL1200_.jpg"
            )
        db.session.add(book)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
