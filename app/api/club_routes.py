from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Book, Comment, db, Reaction, Club
from app.forms import CommentForm, ReactionForm, ClubForm

club_routes = Blueprint('clubs', __name__)

@club_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_club(id):
    club = Club.query.get(id)
    if not club:
        return {'message': "Club couldn't be found"}
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
    return {'message': 'Successfully deleted club'}

@club_routes.route('/<int:id>/books')
@login_required
def club_books(id):
    books = Book.query.join(Club.clubs_books).filter(Club.id==id).all()
    return {'books': [book.to_dict_preview() for book in books]}

@club_routes.route('/<int:id>/books', methods=['POST'])
@login_required
def club_add_books(id):
    club = Club.query.get(id)
    if not club:
        return {'error': 'Club not found'}
    data = request.json
    book = Book.query.get(data['book_id'])
    if not book:
        return {'error': 'Book not found'}
    club.clubs_books.append(book)
    db.session.commit()
    return book.to_dict_preview()

@club_routes.route('/<int:clubId>/books/<int:bookId>', methods=['DELETE'])
@login_required
def club_remove_books(clubId, bookId):
    club = Club.query.get(clubId)
    if not club:
        return {'error': 'Club not found'}
    book = Book.query.get(bookId)
    if not book:
        return {'error': 'Book not found'}
    club.clubs_books.remove(book)
    db.session.commit()
    return {'message': "Book removed from club"}

@club_routes.route('/<int:id>/members')
@login_required
def club_members(id):
    members = User.query.join(Club.clubs_members).filter(Club.id==id).all()
    return {'members': [member.to_dict() for member in members]}

@club_routes.route('/<int:id>/members', methods=['POST'])
@login_required
def club_add_members(id):
    club = Club.query.get(id)
    if not club:
        return {'error': 'Club not found'}
    data = request.json
    user = User.query.get(data['user_id'])
    if not user:
        return {'error': 'User not found'}
    club.clubs_members.append(user)
    db.session.commit()
    return {'message': "Member added to club"}

@club_routes.route('/<int:clubId>/members/<int:memberId>', methods=['DELETE'])
@login_required
def club_remove_members(clubId, memberId):
    club = Club.query.get(clubId)
    if not club:
        return {'error': 'Club not found'}
    user = User.query.get(memberId)
    if not user:
        return {'error': 'User not found'}
    club.clubs_members.remove(user)
    db.session.commit()
    return {'message': "Member removed from club"}
