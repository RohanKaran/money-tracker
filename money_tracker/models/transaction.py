from django.contrib.auth.models import User
from django.db.models import (
    Model,
    CharField,
    ForeignKey,
    CASCADE,
    IntegerField,
    DateTimeField,
)


class Transaction(Model):
    """Model definition for Transactions."""

    name = CharField(max_length=64, null=False)
    description = CharField(max_length=256)
    amount = IntegerField(null=False)
    created_by = ForeignKey(
        User, on_delete=CASCADE, related_name="transactions", null=False
    )
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
