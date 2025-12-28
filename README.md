Assignment 2: Backend API Integration & Service Development

Project Overview

This project is a backend-oriented web application developed using Node.js and Express. The main goal of the project is to demonstrate how to work with third-party APIs on the server side. The application retrieves real-time weather information from the OpenWeather API and displays related news using the News API. All external API communication is handled strictly on the backend to ensure security and proper application architecture.

Setup Instructions

First, make sure that Node.js and npm are installed on your computer.
Open a terminal in the root directory of the project.
Install all required dependencies by running the command npm install.
Create a .env file in the root directory and add your API keys for OpenWeather and News API.
Start the server using the command npm start.
After the server starts, open a browser and navigate to http://localhost:3000
 to access the application.

API Usage Details

Weather API

Endpoint: GET /api/weather?city=CityName
Example request: GET /api/weather?city=Almaty

The weather endpoint returns a JSON object containing the following data: temperature, feels-like temperature, weather description, geographic coordinates, wind speed, country code, and rain volume for the last three hours. All weather data is fetched from the OpenWeather API on the server side and processed before being sent to the client.

News API

Endpoint: GET /api/news?city=CityName
Example request: GET /api/news?city=Almaty

The news endpoint returns a list of recent news articles related to the selected city. Each article includes a title, source name, and URL. If no news articles are available for a specific city, an empty list is returned. This behavior is expected, especially for smaller cities with limited media coverage.

Key Design Decisions

All third-party API requests are performed exclusively on the server side in order to protect API keys and prevent client-side exposure. API keys are stored securely using environment variables in a .env file. The backend processes and normalizes API responses, returning only the required data fields to the frontend. The frontend communicates only with backend endpoints and never directly accesses external APIs. Static frontend files are served from the public directory using Express middleware. The user interface is responsive and adapts to different screen sizes using CSS media queries. Basic error handling is implemented for missing parameters, invalid city names, and API request failures.

Screenshots

<img width="1910" height="1008" alt="image" src="https://github.com/user-attachments/assets/7dee5447-78ad-454f-83fb-3eb419a58572" />


Technologies Used
Node.js, Express.js, OpenWeather API, News API, HTML, CSS, and JavaScript.

