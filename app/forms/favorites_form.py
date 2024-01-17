from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class FavoritesForm(FlaskForm):
    book_id = IntegerField('book_id', validators=[DataRequired()])
