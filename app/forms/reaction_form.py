from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

class ReactionForm(FlaskForm):
    reaction = StringField('reaction', validators=[DataRequired(), Length(max=40)])
    flagger = BooleanField('flagger')
