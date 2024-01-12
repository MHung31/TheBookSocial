from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), Length(max=255)])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    book_id = IntegerField('book_id', validators=[DataRequired()])
    book_location = StringField('book_location', validators=[DataRequired(), Length(max=40)])
    visibility = BooleanField('visibility')
    flagged = BooleanField('flagged')
