from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime
from .club import club_books

favorites = db.Table("favorites",
                       db.Model.metadata,
                       db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
                       db.Column("book_id", db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), primary_key=True),
                       )

class Book(db.Model, UserMixin):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False )
    author = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    preview = db.Column(db.String(255), default="none")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    book_comments = db.relationship("Comment", back_populates="comments_book", cascade="all, delete-orphan")
    book_bookmarks = db.relationship("Bookmark", back_populates="bookmarks_book", cascade="all, delete-orphan")
    books_users = db.relationship("User", secondary=favorites, back_populates="users_books")
    books_clubs = db.relationship("Club", secondary=club_books, back_populates="clubs_books")

    def to_dict_preview(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "preview": self.preview,
            "length": len(self.content)
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "content": self.content,
            "preview": self.preview
        }
