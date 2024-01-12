from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Book

book_routes = Blueprint('books', __name__)

@book_routes.route('/')
def preview():
    books = Book.query.all()
    return {'Books': [book.to_dict_preview() for book in books]}

@book_routes.route('/<int:id>')
def full(id):
    book = Book.query.get(id)
    return book.to_dict_full()
