from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Reaction
from app.forms import CommentForm, ReactionForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
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
@login_required
def delete_book_comments(id):
    comment = Comment.query.get(id)
    if not comment:
        return {"message": "Comment couldn't be found"}
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}

@comment_routes.route('/<int:id>/reactions')
def get_reactions(id):
    reactions = Reaction.query.join(Comment).filter(Comment.id==id).all()
    return {'reactions': [reaction.to_dict() for reaction in reactions]}

@comment_routes.route('/<int:id>/reactions', methods=['POST'])
@login_required
def post_reactions(id):
    data = request.json
    form = ReactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # existing_reaction = Reaction.query.join(Comment.comment_reactions).filter(Reaction.user_id==current_user.id).first()
    # print('existing?----->',existing_reaction.to_dict())
    # if existing_reaction:
    #     return {"errors": "User already has a reaction for this comment"}
    if form.validate_on_submit():
        new_reaction = Reaction(
            reaction = data['reaction'],
            flagger = data['flagger'],
            user_id = current_user.id,
            comment_id = id
        )
        db.session.add(new_reaction)
        db.session.commit()
        return new_reaction.to_dict()
    return form.errors, 401
