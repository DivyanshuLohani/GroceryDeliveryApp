# 10-Minute Grocery Delivery App

<p align="center">
  <img src="https://github.com/user-attachments/assets/f02b1435-0576-43d4-9ff0-29c6aa2f97c4" alt="Image">
</p>

## Overview

This project is an attempt to understand and replicate the logistics behind ultra-fast grocery delivery services like Blinkit, Zepto, and Swiggy Instamart. The goal was to explore the challenges of real-time delivery agent assignment and create a functional prototype.

## Problem Statement

The app functions as a single-vendor eCommerce platform with the unique challenge of assigning nearby delivery agents efficiently to fulfill orders within 10 minutes. Other features remain similar to traditional eCommerce websites.

## Tech Stack

### Backend

- Framework: Django

- Database: PostgreSQL (structured data storage)

- In-Memory Database: Redis (caching and quick data retrieval)

### Frontend

- Framework: React Native (leveraging past experience with Class To Cloud)

## Running the Project

### Backend

To start the backend, run the following command:
```bash

docker-compose up -d
```

## Frontend

To set up and start the frontend, run:
```bash
cd apps/mobile

yarn install  # or npm install

yarn start  # or npm start
```

## Data Scraping for Inventory Management

To populate real-world product data efficiently, I used HAR file-based data scraping, a technique I recently explored. More details can be found here.

## Design Inspiration

- Figma Templates

- UI Inspiration from existing apps like Blinkit & Zepto

# Key Features

- Home Screen

- Live Location Tracking

- Product & Category Listings

- Real-Time Order Assignment

- Live Location Tracking Implementation

Since I had no prior experience with mobile GPS tracking, I researched solutions and found Kafka to be widely recommended. However, to avoid additional complexity in a monolithic architecture, I implemented Redis-based caching for location updates. More details on this can be found here.

While this isn't the most scalable approach, it works fine for a side project with a limited user base. Future improvements will be considered based on performance insights.

## Lessons Learned

- **Tech Stack Decisions**: Balancing complexity and performance is crucial. Instead of blindly following trends, choose a stack that best fits your use case and is maintainable.

- **Real-Time Updates**: Ensuring synchronization across multiple systems is a challenge. Enhancing security and reliability for these updates is still a work in progress.

- **Modular Architecture**: Keeping the app modular allows for easier scalability. Future scaling should only require deploying additional EC2 instances.

## Future Considerations

- Admin Dashboard (Mobile App) for tracking orders and analytics.

- White-labeling: Making the app configurable for different vendors with minimal setup.

- Improved Analytics: Enhancing data insights for better operational decisions.

## Conclusion

Building a 10-minute grocery delivery app is a challenging but rewarding experience. By tackling logistical and technical hurdles head-on, this project lays a solid foundation for future enhancements. If the app is productized, additional features will be implemented to improve scalability and efficiency.
