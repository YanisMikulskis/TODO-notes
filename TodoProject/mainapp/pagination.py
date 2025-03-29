from rest_framework.pagination import LimitOffsetPagination


class ProjectPagination(LimitOffsetPagination):
    def __init__(self):
        self.default_limit = 10

class TodoPagination(LimitOffsetPagination):
    def __init__(self):
        self.default_limit = 20