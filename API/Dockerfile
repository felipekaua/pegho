FROM python:3

WORKDIR /app

COPY requirements.txt /app

RUN pip3 install -r requirements

COPY . .

EXPOSE 8080

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8080" ]