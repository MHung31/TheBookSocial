from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), Length(max=255)])
    book_location = StringField('book_location', validators=[ Length(max=40)])
    visibility = BooleanField('visibility')
    flagged = BooleanField('flagged')
