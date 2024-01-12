from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, db
from app.forms import FavoritesForm

session_routes = Blueprint('session', __name__)

@session_routes.route('/favorites')
@login_required
def favorites():
    if current_user.is_authenticated:
        favorites = Book.query.join(User.users_books).filter(User.id==current_user.id).all()
        return {'favorites': [book.to_dict_preview() for book in favorites]}

@session_routes.route('/favorites', methods=['POST'])
@login_required
def favorites_add():
    form = FavoritesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data=request.json
        user = User.query.get(data['user_id'])
        book = Book.query.get(data['book_id'])
        user.users_books.append(book)
        db.session.commit()
        return {"message": "Successfully added to favorites"}
    return form.errors, 401

@session_routes.route('/favorites', methods=['DELETE'])
@login_required
def favorites_remove():
    data=request.json
    if current_user.is_authenticated:
        user = User.query.get(data['user_id'])
        book = Book.query.get(data['book_id'])
        user.users_books.remove(book)
        db.session.commit()
        return {"message": "Successfully removed from favorites"}

