from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Bookmark
from app.forms import CommentForm, BookmarkForm

bookmark_routes = Blueprint('bookmarks', __name__)

@bookmark_routes.route('/<int:id>', methods=['PUT'])
def update_book_comments(id):
    bookmark = Bookmark.query.get(id)
    data = request.json
    form = BookmarkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        bookmark.position = data["position"]
        db.session.commit()
        return bookmark.to_dict()
    return form.errors, 401
