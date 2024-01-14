from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class BookmarkForm(FlaskForm):
    position = IntegerField('position', validators=[DataRequired()])
