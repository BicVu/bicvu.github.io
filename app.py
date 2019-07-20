from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/nutrition")
def nutrition():
    return render_template('nutrition.html')

@app.route("/health")
def health():
    return render_template('health.html')    

if __name__ == "__main__":
    app.run(debug=True)