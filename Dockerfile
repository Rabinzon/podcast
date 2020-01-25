FROM mhart/alpine-node:12
WORKDIR /podcast
ADD . /podcast
RUN npm install
EXPOSE 6346
CMD ["npm", "start"]
