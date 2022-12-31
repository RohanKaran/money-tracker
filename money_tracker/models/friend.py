from django.contrib.auth.models import User
from django.db.models import (
    Model,
    ForeignKey,
    CASCADE,
    DateTimeField,
    BooleanField,
)


class Friend(Model):
    """Model definition for Friend."""

    user1 = ForeignKey(User, on_delete=CASCADE, related_name="friends1", null=False)
    user2 = ForeignKey(User, on_delete=CASCADE, related_name="friends2", null=False)
    accepted = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
