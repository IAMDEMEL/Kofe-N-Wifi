from flask import Flask, render_template, request, redirect, url_for
import smtplib
import json

MY_EMAIL = "demelgayle4@gmail.com"
APP_PASSWORD = "lrwakfivpymjwbas"
RECEIVERS_EMAIL = "iamdemel@outlook.com"
GMAIL_SEVER = "smtp.gmail.com"

app = Flask(__name__)


@app.route("/")
def home():
    with open('./data/parish_information.json') as parish_info:
        data = json.load(parish_info)
        return render_template('home.html', parish_json=data)


@app.route("/about")
def about():
    return render_template('about.html')


@app.route("/contact")
def contact():
    if request.form.get('name') is not None:
        name = request.form.get('name')
        email = request.form.get('email')
        thoughts = request.form.get('thoughts')
        with smtplib.SMTP(GMAIL_SEVER, port=587) as connection:
            connection.starttls()
            connection.login(user=MY_EMAIL, password=APP_PASSWORD)
            connection.sendmail(
                from_addr=MY_EMAIL,
                to_addrs=RECEIVERS_EMAIL,
                msg=f"Subject: Kofe N Wifi Message!!!\n\n Hey Demel,\n\n This is " +
                    name + ". " + thoughts + "\n\nMy email is " + email
            )
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
