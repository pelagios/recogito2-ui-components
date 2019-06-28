# Recogito2 Document UI Components

An attempt to restructure the way Recogito UI code is organized. This repository contains a bunch
of individual React projects, each implementing one embeddable widget that is used somewhere inside
Recogito's document views.

## Widgets

```
- stats
  |- activity ... activity stats dashboard
  |- entity ..... entity stats dashboard
  |- tags ....... tag stats dashboard
  |- common ..... common JS used across stats dashboards
```

## Usage

Widgets are individual React/Webpack projects. To work  on the 
code, change into the project folder (e.g. `stats/activity`).

- `npm install` to install dependencies
- `npm start` to launch dev mode (server runs on port 3000)
- `npm run build` to build the minified bundle (see `dist` folder)
