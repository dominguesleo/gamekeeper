# GameKeeper

GameKeeper is a digital video game library that allows you to stay up to date with the latest releases and consult details about your favorite games. It also allows user registration to have a personal library and store the status of each game. It uses the RAWG API to get all the information about the games.

![img1](./img/img1.png)
![img2](./img/img2.png)

## Features

- Consult details about video games.
- Stay up to date with the latest releases in the gaming world.
- Register and create your own personal library.
- Store the status of your games (playing, completed, etc.).
- Responsive design using native CSS.

![img3](./img/img3.png)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [RAWG API](https://rawg.io/apidocs)
- [Clerk](https://clerk.dev/) for user authentication.
- [Mongoose](https://mongoosejs.com/) for database management.
- [Swiper](https://swiperjs.com/) for image carousels.
- [Sharp](https://sharp.pixelplumbing.com/) for image optimization.
- [Dompurify](https://github.com/cure53/DOMPurify) for HTML sanitization.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dominguesleo/gamekeeper.git
cd gamekeeper
```

2. Install the dependencies:
```bash
npm install
```

3. Configure the environment variables: Create a .env.local file in the root of the project and add the following variables:
```
NEXT_PUBLIC_RAWG_TOKEN=your_rawg_api_key
MONGO_URL=your_mongodb_uri
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```
3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to http://localhost:3000.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the server in production mode.
- `npm run lint`: Runs ESLint to find and fix problems in the code.
