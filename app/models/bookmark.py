from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Bookmark(db.Model, UserMixin):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), nullable=False)
    position = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    bookmarks_user =db.relationship("User", back_populates="user_bookmarks")
    bookmarks_book =db.relationship("Book", back_populates="book_bookmarks")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "position": self.position
        }
