from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Reaction, Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/reactions')
@login_required
def userReactions(id):
    """
    Query for all reactions for a user
    """
    reactions = Reaction.query.join(Comment).filter(Comment.user_id==id).all()
    return {'reactions': [reaction.to_dict() for reaction in reactions]}

@user_routes.route('/<int:id>/friends')
@login_required
def get_friends(id):
    self = User.query.get(id)
    return {
        "following": [user.to_dict() for user in self.following.all()],
        "followers": [user.to_dict() for user in self.followed.all()]
        }
