from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=40)])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=40)])
    avatar = StringField('avatar', validators=[DataRequired(), Length(max=255)])

class FriendsForm(FlaskForm):
    follower_id = IntegerField('follower_id', validators=[DataRequired()])
    following_id = IntegerField('following_id', validators=[DataRequired(), user_exists])
