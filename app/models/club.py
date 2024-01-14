from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

club_books = db.Table("club_books",
                       db.Model.metadata,
                       db.Column("club_id", db.Integer, db.ForeignKey(add_prefix_for_prod("clubs.id")), primary_key=True),
                       db.Column("book_id", db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), primary_key=True),
                       )

club_members = db.Table("club_members",
                       db.Model.metadata,
                       db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
                       db.Column("club_id", db.Integer, db.ForeignKey(add_prefix_for_prod("clubs.id")), primary_key=True),
                       )

class Club(db.Model, UserMixin):
    __tablename__ = 'clubs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    clubs_books  = db.relationship("Book", secondary=club_books, back_populates="books_clubs")
    clubs_members  = db.relationship("User", secondary=club_members, back_populates="members_clubs")
    clubs_owner = db.relationship("User", back_populates="owner_clubs")

    def to_dict(self):
        return {
            "id":self.id,
            "title": self.title,
            "user_id":self.user_id,
            "is_public": self.is_public
        }
