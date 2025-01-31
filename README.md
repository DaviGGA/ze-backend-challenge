# Zé Delivery Challenge



## Technologies:

### Backend
- Node: v20.14.0
- MongoDB No relational DB
- KoaJS Server framework
- Turf.js Library for GeoJSON manipulation
- Docker & Docker compose for containerization

### Frontend
- Node: v20.14.0
- React
- Leaflet/React Leaflet: Library for coordinates visualization

## How to install

### Backend

- Navigate to server folder
```
cd server
```

- Install dependencies
```
npm install
```

- Run container
```
npm run compose:up
```

- Populate database (Optional) 
```
npm run populate
```

- Run server
```
npm run dev
```

### Frontend
- Navigate to client folder
```
cd client
```

- Install dependencies
```
npm install
```

- Run client
```
npm run dev
```

## Routes

- POST /partner 
```
  {
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [30,20],
            [45,40],
            [10,40],
            [30,20]
          ]
        ],
        [
          [
            [15,5],
            [40,10],
            [10,20],
            [5,10],
            [15,5]
          ]
        ]
      ]
    },
    "address": {
      "type": "Point",
      "coordinates": [
        -46.57421,
        -21.785741
      ]
    },
    "tradingName": "Adega da Cerveja - Pinheiros",
    "ownerName": "Zé da Silva",
    "document": "1432132123891/0001",
  },
```

- GET /partner

- GET /nearest?lat={x}&long={y}

- GET /partner:id