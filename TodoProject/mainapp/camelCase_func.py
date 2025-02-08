


def to_camel_case(snake_case):
    return ''.join(map(lambda el: el[0].upper() + el[1:], snake_case.split('_')))


def to_snake_case(camelCase):
    for i in range(1, len(camelCase)):
        if camelCase[i] == camelCase[i].upper():
            camelCase = camelCase.replace(camelCase[i], f'_{camelCase[i].lower()}')
    return camelCase[0].lower() + camelCase[1:]