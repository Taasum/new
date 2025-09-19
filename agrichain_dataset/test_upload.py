import requests

url = "http://127.0.0.1:5000/upload"
file_path = r"C:\Users\Tabassum\OneDrive\Desktop\agrichain_dataset\uploads\original\wheat_test.jpg"

with open(file_path, 'rb') as f:
    files = {'file': f}  # key must match Flask: request.files['file']
    response = requests.post(url, files=files)

print("Status Code:", response.status_code)

try:
    data = response.json()
    print("JSON Response:", data)
except Exception:
    print("Server response is not JSON:")
    print(response.text)
