from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class BookmarkForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    book_id = IntegerField('book_id', validators=[DataRequired()])
    position = IntegerField('position', validators=[DataRequired()])
