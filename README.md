## About

[I originally launched this in 2019](https://fahdsheikh.webflow.io/blog/play-stupid-games-win-stupid-prizes) and it was a hit with Reddit. Unfortunately, Heroku took down the application because I was being cheap and using their free service. So I updated it for 2023 (just in time for free agency!)

The motivation was simple. Kyrie Irving is an NBA player who at times makes outlandish, conspiratorial, and controversial statements, often unapologetically. I gamified this to share some of these quotes, partly to see if it was just me severely miscontruing what he's saying and if others had a similar degree of confusion. 

When I originally created this there were only two choices per question, with an average correct response rate of 63%, so I made it multiple choice this time to heighten the difficulty. We'll see what the data says this time around!

(Kyrie if you're reading this I'm sorry, I know I have too much free time.)

Site is live on [didkyriesayit.com](https://didkyriesayit.com). 

## To Run
```bash
# Install dependencies
yarn install

# Set up database
yarn schema

# Seed database -> requires PostgreSQL installed
yarn schema

# Run in dev
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

This is a Next.js application. Next.js is pretty cool. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
