from rest_framework.pagination import LimitOffsetPagination


class CustomUserPagination(LimitOffsetPagination):
    def __init__(self):
        self.default_limit = 15
