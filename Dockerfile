FROM node:18-alpine

# Set TimeZone correctly
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN cat /etc/hosts

# Bundle app source
COPY . /usr/src/app
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "run","start" ] 
