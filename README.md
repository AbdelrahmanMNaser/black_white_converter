# Black & White Image Converter

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Getting Started](#getting-started)
- [License](#license)

## Overview
A web application that converts color images to black and white using threshold-based conversion. Users can upload images, adjust conversion settings, and optimize output size.

## Features
- Image upload with drag & drop support
- Real-time image preview
- Threshold adjustment for B&W conversion
- Image size optimization
- Supported formats: PNG, JPG, JPEG, GIF, BMP
- Before/After comparison view
- Image resolution and size information

## Tech Stack
- Frontend: React.js, TailwindCSS
- Backend: Flask (Python)
- Image Processing: Pillow

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
```
cd frontend
npm install
```

## Getting Started

### Backend
```
cd backend
python app.py
```

### Frontend
```
cd frontend
npm start
```

## License
This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
