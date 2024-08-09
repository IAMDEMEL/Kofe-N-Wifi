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


@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        thoughts = request.form.get('thoughts')
        message = (f"Subject: Kofe N Wifi Message!!!\n\n Hey Demel,\n\n This is " +
                   name + ". " + thoughts + "\n\nMy email is " + email)
        sever = smtplib.SMTP(GMAIL_SEVER, 587)
        sever.starttls()
        sever.login(MY_EMAIL, APP_PASSWORD)
        sever.sendmail(MY_EMAIL, RECEIVERS_EMAIL, message)
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
