from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['PUT'])
def update_book_comments(id):
    comment = Comment.query.get(id)
    data = request.json
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = data["comment"]
        comment.visibility = data['visibility']
        comment.flagged = data['flagged']
        db.session.commit()
        return comment.to_dict()
    return form.errors, 401

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_book_comments(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}
