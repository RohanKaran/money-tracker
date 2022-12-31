from rest_framework.authtoken.models import Token


def create_token(user, force_new=False):
    """
    Creates a new token for a user or returns the existing one.

    :param user: User object
    :param force_new: forces creating a new token
    """
    token = False

    try:
        token = Token.objects.get(user=user)
    except Token.DoesNotExist:
        force_new = True

    if force_new:
        if token:
            token.delete()
        token = Token.objects.create(user=user)

    return token
