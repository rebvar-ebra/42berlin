# Next.js Weather Application

This is a weather application built using [Next.js](https://nextjs.org/), which fetches real-time weather data from a third-party API. The application allows users to search for current weather information by city and provides a 5-day forecast. It is designed to demonstrate the use of server-side rendering, API data fetching, and responsive UI components.

## Features

- 🌐 **Search by City**: Get current weather conditions for any city.
- 📍 **Geolocation Support**: Retrieve weather data for your current location.
- 🌦️ **5-day Forecast**: View upcoming weather trends.
- 🌗 **Dark/Light Mode**: User preference for dark or light themes.
- 🔄 **Dynamic Updates**: Updates weather information in real-time based on user input.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: TailwindCSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **API Integration**: Fetch API or Axios

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rebvar-ebra/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root of your project and add your API key and other configurations:
