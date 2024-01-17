from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Reaction(db.Model, UserMixin):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reaction = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), nullable=False)
    flagger = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    reactions_comment  = db.relationship("Comment", back_populates="comment_reactions")
    reactions_user  = db.relationship("User", back_populates="user_reactions")

    def to_dict(self):
        return {
            "id": self.id,
            "reaction": self.reaction,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
            "flagger": self.flagger,
            "created_at": self.created_at
        }
