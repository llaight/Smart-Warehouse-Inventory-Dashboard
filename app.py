from flask import Flask, request, jsonify
from datetime import datetime
import psycopg2

app = Flask(__name__)

@app.route('/rfid-scan', methods=['POST'])

def scan_barcode():
    data= request.json
    conn= psycopg2.connect(
        dbname="warehouse",
        user="",
        password="",
        host="localhost",
        port="5432")
    cursor= conn.cursor()
    cursor.execute("""
                   INSERT INTO inventory (sku, product_name, quantity, last_scanned, status)
                   VALUES (%s, %s, %s, %s, %s)""", (data['sku'], data['product_name'], data['quantity'], datetime.now(), data['status'])
                   )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message":"RFID scan recorded successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port='5001')
