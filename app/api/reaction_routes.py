from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Reaction
from app.forms import CommentForm, ReactionForm

reaction_routes = Blueprint('reactions', __name__)

@reaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_reaction(id):
    reaction = Reaction.query.get(id)
    if reaction:
        db.session.delete(reaction)
        db.session.commit()
        return {'message': 'Successfully deleted reaction'}
    return {'error': 'Reaction not found'}
