# Wedding Invitation App

Tech Stack: Netlify, Vite, React TS, Ant Design, Render container (previously Heroku container), Python FastAPI, Render PostgreSQL

![Tech stacks](https://skillicons.dev/icons?i=vite,ts,react,fastapi,python,docker,ubuntu,bash,heroku,netlify,postgres)

Frontend: https://suizerlyciawedding.netlify.app/

Backend: Render free Docker web service

Database: Render free tier PostgreSQL

## Local Development

### To install all dependencies from `package.json`

If you have `nvm` or `npm` available, simply run:
```
npm install
```
### Docker container

If you are Docker euthanist, have Docker Desktop on your end:
```
docker-compose up --build
```

### Runs the app in the development mode

```
npm start
```
```
docker-compose up # provided you have Docker installed
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

### To fix format lintings for all codes using `prettier`

Usual terminal commands such as:
```
npm run format
``` 

OR

```
docker exec -it weddinginvitation npm run format
```

## Staging environment (Heroku, Render...)

### Set Heroku default stack as free container
```
heroku login
heroku stack:set heroku-22 -a szlyciawedding
```

### Create Render Docker web service
See [backend](https://github.com/Suizer98/weddingbackend)

### Staging website configuration
https://app.netlify.com/sites/suizerlyciawedding/overview

https://dashboard.heroku.com/apps/weddingbackend

https://dashboard.render.com/d/dpg-cpk09cf109ks73etk9ng-a
