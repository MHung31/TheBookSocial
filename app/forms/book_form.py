from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class BookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=100)])
    author = StringField('author', validators=[DataRequired(), Length(max=50)])
    content = StringField('content', validators=[DataRequired()])
    preview = StringField('preview', validators=[DataRequired(), Length(max=255)])
