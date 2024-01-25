from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), nullable=False)
    book_location = db.Column(db.String(40), nullable=False)
    visibility = db.Column(db.String(40), default="private")
    flagged = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    comment_reactions  = db.relationship("Reaction", back_populates="reactions_comment", cascade="all, delete-orphan")
    comments_user  = db.relationship("User", back_populates="user_comments")
    comments_book  = db.relationship("Book", back_populates="book_comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "book_id": self.book_id,
            "book_location": self.book_location,
            "visibility": self.visibility,
            "flagged": self.flagged,
            "created_at": self.created_at,
            "user": self.comments_user.to_dict()
        }
