from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Bookmark, Reaction
from app.forms import CommentForm, BookmarkForm

book_routes = Blueprint('books', __name__)

@book_routes.route('/')
def preview():
    books = Book.query.all()
    return {'Books': [book.to_dict_preview() for book in books]}

@book_routes.route('/<int:id>')
def full(id):
    book = Book.query.get(id)
    if book:
        return book.to_dict_full()
    return {'error': 'Book not found'}


@book_routes.route('/<int:id>/comments')
def book_comments(id):
    comments = Comment.query.join(Book.book_comments).filter(Book.id==id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@book_routes.route('/<int:id>/reactions')
def book_reactions(id):
    reactions = Reaction.query.join(Comment).filter(Comment.book_id==id).all()
    return {'reactions': [reaction.to_dict() for reaction in reactions]}


@book_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_book_comments(id):
    data=request.json
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            comment = data["comment"],
            user_id = current_user.id,
            book_id = id,
            book_location = data["book_location"],
            visibility = data["visibility"])
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return form.errors, 401

@book_routes.route('/<int:id>/bookmark')
@login_required
def get_bookmark(id):
    bookmark = Bookmark.query.join(Book).filter(Book.id==id, User.id==current_user.id).first()
    if bookmark:
        return {'bookmark': bookmark.to_dict()}
    return {'bookmark': 'None'}

@book_routes.route('/<int:id>/bookmark', methods=['POST'])
@login_required
def add_bookmark(id):
    data=request.json
    form = BookmarkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_bookmark = Bookmark(
            user_id = current_user.id,
            book_id = id,
            position = data['position']
        )
        db.session.add(new_bookmark)
        db.session.commit()
        return new_bookmark.to_dict()
    return form.errors, 401
