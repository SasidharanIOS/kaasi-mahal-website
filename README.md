# Kaasi Mahal Customer Website

React.js + Tailwind CSS customer-facing website for the Kaasi Mahal backend.

## Pages Included

- Home
- About Us
- Services
- Booking
- Gallery
- Contact Us with map

## Backend Connection

The website connects to the existing Kaasi Mahal backend public APIs:

```text
GET  /api/public/pricing
GET  /api/public/services
GET  /api/public/purposes
GET  /api/public/availability?start_time=&end_time=
POST /api/public/bookings
```

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default API URL in `.env.example`:

```text
VITE_API_BASE_URL=http://localhost:7070/api/public
```

Update it to your live backend URL when hosting.

## Gallery Images

Put all venue images inside:

```text
public/gallery
```

The project automatically scans the folder and displays every image in the Gallery page before running or building.

Supported image formats:

```text
jpg, jpeg, png, webp, gif, avif
```

## Contact Map

Update the map and contact details in `.env`:

```text
VITE_SITE_NAME=Kaasi Mahal
VITE_CONTACT_PHONE=+91 98765 43210
VITE_CONTACT_EMAIL=info@kaasimahal.com
VITE_CONTACT_ADDRESS=Kaasi Mahal, Tamil Nadu, India
VITE_MAP_EMBED_URL=https://www.google.com/maps?q=Kaasi%20Mahal%20Mandapam&output=embed
```

## Build

```bash
npm run build
```

The build output will be generated in the `dist` folder.
# kaasi-mahal-website
