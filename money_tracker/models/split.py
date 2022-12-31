from django.contrib.auth.models import User
from django.db.models import (
    Model,
    ForeignKey,
    CASCADE,
    IntegerField,
    DateTimeField,
    BooleanField,
)

from money_tracker.models import Transaction


class Split(Model):
    """Model definition for Split."""

    transaction = ForeignKey(
        Transaction, on_delete=CASCADE, related_name="splits", null=False
    )
    source = ForeignKey(User, on_delete=CASCADE, related_name="splits_src", null=False)
    destination = ForeignKey(
        User, on_delete=CASCADE, related_name="splits_dest", null=False
    )
    amount = IntegerField(null=False)
    completed = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
