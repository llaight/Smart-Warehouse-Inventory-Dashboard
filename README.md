# 📦 Smart Warehouse Inventory Dashboard

A full-stack simulation of a smart warehouse system that supports barcode scanning, inventory tracking, real-time visualization, and analytics.

## 🔧 Features

- 🧠 Flask microservice for barcode scan ingestion  
- 🗄️ PostgreSQL database to store inventory activity  
- 🌐 Laravel backend to expose inventory API  
- 📊 Next.js + Chart.js dashboard to visualize inventory movement  
- 📈 Metabase dashboards for time series, IN/OUT status, and top SKUs  

## 🧰 Tech Stack

| Component     | Technology              |
|---------------|-------------------------|
| AI + Scanner  | Python + Flask          |
| Backend       | Laravel (PHP)           |
| Database      | PostgreSQL              |
| Frontend      | Next.js + Chart.js      |
| Analytics     | Metabase                |
| Tools         | Postman, Git, Docker (optional) |

## 🗃️ Folder Structure

```
smart-warehouse-inventory-dashboard/
├── app.py                      # Flask API for barcode scanning
├── smart-warehouse/            # Laravel backend
├── next-dashboard/             # Next.js frontend (dashboard UI)
├── inventory_data.csv          # Sample inventory data (mock or Kaggle)
└── README.md                   # This file
```

## 🚀 How It Works

1. **Scan barcode with Flask endpoint**
   - Sends data (SKU, name, quantity, IN/OUT) via POST.
2. **Store into PostgreSQL**
   - Automatically adds timestamp and saves inventory activity.
3. **Laravel serves data**
   - API at `/api/inventory` provides JSON for frontend.
4. **Next.js visualizes the data**
   - Dashboard at `/dashboard` shows inventory over time.
5. **Metabase performs deeper analysis**
   - View time trends, status ratios, and top-moving SKUs.

## 📦 Sample Inventory Payload

Use this in Postman to test the `/rfid-scan` Flask endpoint:

```json
{
  "sku": "A001",
  "product_name": "Widget A",
  "quantity": 25,
  "status": "IN"
}
```

## 🛠️ Setup Guide

### 1. PostgreSQL Table

```sql
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(20),
  product_name TEXT,
  quantity INT,
  last_scanned TIMESTAMP,
  status VARCHAR(10) -- IN or OUT
);
```

### 2. Run Flask (Python) Service

```bash
python app.py
# Endpoint: http://localhost:5001/rfid-scan
```

### 3. Run Laravel Backend

```bash
cd smart-warehouse
php artisan serve
# API: http://localhost:8000/api/inventory
```

### 4. Run Next.js Frontend

```bash
cd next-dashboard
npm install
npm run dev
# Dashboard: http://localhost:3000/dashboard
```

### 5. Setup Metabase (Optional but recommended)

- Connect to PostgreSQL
- Build dashboards:
  - Time Series of Scanned Items
  - Pie Chart of IN vs OUT
  - Bar Chart of Top SKUs
- Enable public sharing

Example embed URL:
```
http://localhost:3000/public/dashboard/your-dashboard-id
```

## 📊 Metabase Dashboard Ideas

- **Time Series**: Show scan frequency over time
- **Status Pie Chart**: Count of "IN" vs "OUT"
- **Top SKUs**: Most frequently moved products

## ✅ Project Goals

- [x] Build barcode scanner API using Flask
- [x] Save inventory movement in PostgreSQL
- [x] Visualize trends using Chart.js + Next.js
- [x] Integrate Laravel as middleware API
- [x] Create embedded analytics via Metabase
- [ ] Add user authentication (optional)
- [ ] Deploy to cloud (Render/Heroku/Fly.io)

## 🧪 Testing

Use Postman to send POST requests to:
```
http://localhost:5001/rfid-scan
```

Example payload:
```json
{
  "sku": "A002",
  "product_name": "Widget B",
  "quantity": 10,
  "status": "OUT"
}
```

## 🌐 Sample Metabase Embed (Optional)

You can embed your dashboard directly:

```html
<iframe
  src="http://localhost:3000/public/dashboard/acf08966-126a-4a42-a94e-ea906af9e123"
  frameborder="0"
  width="100%"
  height="600"
  allowtransparency
></iframe>
```

## 📜 License

MIT License - Free to use, fork, or extend for learning and portfolio use.

## 👩‍💻 Author

**Developed during internship at LAMINA**  
By: Angela Loro  
GitHub: [github.com/llaight](https://github.com/llaight)
