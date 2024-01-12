from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


class ClubForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=50)])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    is_public = BooleanField('is_public')

class ClubBooksForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    book_id = IntegerField('book_id', validators=[DataRequired()])

class ClubMembersForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists])
    club_id = IntegerField('club_id', validators=[DataRequired()])
