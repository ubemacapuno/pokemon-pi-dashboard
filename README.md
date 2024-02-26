# Pokémon-Pi-Dashboard

[Pokémon Pi Dashboard](https://pi-dash.vercel.app/) is an interactive way to check the weather. It is a weather app incorporating Pokémon sprites to represent the current weather conditions.

The app is built with React + Vite, hosted on Vercel, and uses the OpenWeatherMap API to fetch weather data. The app is designed to be displayed on my personal Raspberry Pi with a 7" touchscreen, but it is responsive and can also be viewed on any device with a browser.

With the help of [Vercel Serverless Functions](https://vercel.com/docs/functions), I can securely manage and utilize my API key without exposing it client-side, ensuring enhanced security and protection of sensitive data in my weather application.

 <tr>
    <td width="60%"  style="align:center;" valign="top">
            <img src="https://coreydamocles.vercel.app/images/pokemon-pi-dashboard.jpg" width="60%"  alt="Pokémon Pi Dashboard"/>
    </td>
  </tr>

## Getting Started

View the deployed [DEMO here](https://pi-dash.vercel.app/)</a>. To get Poké Pi Dashboard running on your local environment, follow the instructions below.

### Prerequisites

- OpenWeather account with working API key
- Git
- GitHub
- Node.js
- pnpm, npm, or yarn
- Vercel (for deployment)

### Installing

To set up your development environment, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/ubemacapuno/pokemon-pi-dashboard.git
cd poke-pi-dashboard

```

2. Install the dependencies (using pnpm for example):

# Using pnpm

```
pnpm install
```

# Or using npm

```
npm install
```

3. Create a `.env` file at the root directory and enter your API key:

```
OPENWEATHERMAP_API_KEY=[Enter OpenWeather API Key Here]
```

4. This project uses serverless functions to make the fetch request to the OpenWeather API. To run the development server while incorporating the serveless function, run

```
vercel dev
```

otherwise, use pnpm (but know that you will need to update the fetch to happen client-side instead of server-side):

```
pnpm dev
```

5. Navigate to `http://localhost:5173` (or respective port mentioned in the terminal) in your browser to see the application running.

## Deployment

This app is deployed on Vercel. To deploy your version:

- Create a Vercel project and link it to your GitHub repository.
- Configure OpenWeatherMap API keys in Vercel's environment variables.
- Deploy through Vercel's dashboard.

## Built With

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- React
- OpenWeather.org API

## Lessons Learned:

- Vercel deployment and fetching data using serverless functions to prevent secret keys from being exposed client-side.
- Better understanding of useState and useEffect hooks
- Using [styled-components](https://styled-components.com/) for React component styling
