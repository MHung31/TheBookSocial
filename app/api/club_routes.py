from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Reaction, Club
from app.forms import CommentForm, ReactionForm, ClubForm

club_routes = Blueprint('clubs', __name__)

@club_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_club(id):
    club = Club.query.get(id)
    data = request.json
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        club.title = data['title']
        club.is_public = data['is_public']
        db.session.commit()
        return club.to_dict()
    return form.errors, 401

@club_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_club(id):
    club = Club.query.get(id)
    db.session.delete(club)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}
