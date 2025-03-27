
from re import sub

def to_camel_case(snake_case):
    print(f'snake_case = {snake_case}')
    return ''.join(map(lambda el: el[0].upper() + el[1:], snake_case.split('_')))


def to_snake_case(camelCase):
    print(f'camelCase = {camelCase}')
    # for i in range(1, len(camelCase)):
    #     if camelCase[i] == camelCase[i].upper():
    #         camelCase = camelCase.replace(camelCase[i], f'_{camelCase[i].lower()}')
    # return camelCase[0].lower() + camelCase[1:]
    return sub(r'(?<!^)(?=[A-Z])', '_', camelCase).lower()