FROM node:18-alpine

EXPOSE 3000
WORKDIR /app
COPY . .

RUN npm install --production
RUN npm run build --production

# You'll probably want to remove this in production, it's here to make it easier to test things!
RUN rm prisma/dev.sqlite
RUN npx prisma migrate dev --name init

CMD ["npm", "run", "start"]
