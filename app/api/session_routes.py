from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, db, Club
from app.forms import FavoritesForm, ClubForm, ClubMembersForm, ClubBooksForm

session_routes = Blueprint('session', __name__)

@session_routes.route('/favorites')
@login_required
def favorites():
        favorites = Book.query.join(User.users_books).filter(User.id==current_user.id).all()
        return {'favorites': [book.to_dict_preview() for book in favorites]}

@session_routes.route('/favorites', methods=['POST'])
@login_required
def favorites_add():
    form = FavoritesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data=request.json
        user = User.query.get(current_user.id)
        book = Book.query.get(data['book_id'])
        user.users_books.append(book)
        db.session.commit()
        return {"added": book.to_dict_preview()}
    return form.errors, 401

@session_routes.route('/favorites/<int:bookId>', methods=['DELETE'])
@login_required
def favorites_remove(bookId):
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        book = Book.query.get(bookId)
        user.users_books.remove(book)
        db.session.commit()
        return {"message": "Successfully removed from favorites"}

@session_routes.route('/clubs')
@login_required
def get_session_clubs():
    clubs = Club.query.join(User.members_clubs).filter(User.id==current_user.id).all()
    return {'clubs': [club.to_dict() for club in clubs]}

@session_routes.route('/clubs', methods=['POST'])
@login_required
def create_club():
    data = request.json
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_club = Club(
            title = data['title'],
            user_id = current_user.id,
            is_public = data['is_public']
        )
        db.session.add(new_club)
        db.session.commit()
        user = User.query.get(current_user.id)
        user.members_clubs.append(new_club)
        db.session.commit()
        return new_club.to_dict()
    return form.errors, 401

@session_routes.route('/friends')
@login_required
def get_friends():
    self = User.query.get(current_user.id)
    return {
        "following": [user.to_dict() for user in self.following.all()],
        "followers": [user.to_dict() for user in self.followed.all()]
        }

@session_routes.route('/friends', methods=['POST'])
@login_required
def add_friends():
    data = request.json
    self = User.query.get(current_user.id)
    friend = User.query.get(data['user_id'])
    if not friend:
        return {'error': 'User not found'}
    self.following.append(friend)
    db.session.commit()
    return {"message": 'Friend added'}

@session_routes.route('/friends/<int:friendId>', methods=['DELETE'])
@login_required
def remove_friends(friendId):
    self = User.query.get(current_user.id)
    friend = User.query.get(friendId)
    if not friend:
        return {'error': 'User not found'}
    self.following.remove(friend)
    db.session.commit()
    return {"message": 'Friend removed'}
