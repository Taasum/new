from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
import cv2
import numpy as np

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def grade_image(filename):
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img = cv2.imread(path)
    if img is None:
        return 'C'

    h, w, _ = img.shape
    size_score = 2 if h*w >= 500*500 else 1 if h*w >= 300*300 else 0

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean_brightness = np.mean(gray)
    color_score = 2 if mean_brightness >= 150 else 1 if mean_brightness >= 100 else 0

    edges = cv2.Canny(gray, 100, 200)
    edge_density = np.sum(edges > 0) / (h*w)
    texture_score = 2 if edge_density >= 0.05 else 1 if edge_density >= 0.02 else 0

    total_score = size_score + color_score + texture_score
    return 'A' if total_score >= 5 else 'B' if total_score >= 3 else 'C'

@app.route('/')
def home():
    return "Flask Server is Running!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        grade = grade_image(filename)
        return jsonify({'message':'File uploaded successfully','file_path':file_path,'grade':grade}), 200
    else:
        return jsonify({'error':'File type not allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
