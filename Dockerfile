FROM python:3.12-slim-bookworm



RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*


RUN pip3 install --upgrade pip


COPY TodoProject/requirements_for_docker.txt .
RUN pip3 install --no-cache-dir -r requirements_for_docker.txt

COPY ./TodoProject/ .


COPY wait-for-postgres.sh .

RUN chmod +x wait-for-postgres.sh

RUN pip3 install gunicorn




