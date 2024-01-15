from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .book import favorites
from .club import club_members

friends = db.Table("friends",
                       db.Model.metadata,
                       db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
                       db.Column("following_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
                       )

if environment == "production":
    friends.schema = SCHEMA
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    avatar = db.Column(db.String(255), default="none")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    following = db.relationship('User',
                            secondary=friends,
                            primaryjoin=(friends.c.follower_id == id),
                            secondaryjoin=(friends.c.following_id == id), backref=db.backref("followed", lazy="dynamic"),
                            lazy="dynamic")
    members_clubs = db.relationship("Club", secondary=club_members, back_populates="clubs_members")
    users_books  = db.relationship("Book", secondary=favorites, back_populates="books_users")
    user_bookmarks  = db.relationship("Bookmark", back_populates="bookmarks_user", cascade="all, delete-orphan")
    owner_clubs  = db.relationship("Club", back_populates="clubs_owner")
    user_comments  = db.relationship("Comment", back_populates="comments_user", cascade="all, delete-orphan")
    user_reactions  = db.relationship("Reaction", back_populates="reactions_user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar": self.avatar
        }
