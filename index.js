const Podcast = require('podcast');
const data = require('./data');
const express = require('express');

/* lets create an rss feed */
const feed = new Podcast({
  title: 'Перевод Корана',
  description: 'Смысловой перевод Священного Корана на русский язык. Перевод Эльмира Кулиева.',
  feed_url: 'http://f2f3dff6-e88d-4558-950d-621650c19dd1.pub.cloud.scaleway.com:6346/rss.xml',
  site_url: 'http://f2f3dff6-e88d-4558-950d-621650c19dd1.pub.cloud.scaleway.com:6346/',
  language: 'ru',
  categories: ['Religion & Spirituality/Islam'],
  pubDate: 'Mon, 20 Jan 2020 06:38:17 +0000',
  itunesCategory: [{
    "text": "Religion & Spirituality",
    "subcats": [{
      "text": "Islam"
    }]
  }],
  itunesImage: 'http://i1.sndcdn.com/avatars-000758934862-u8tf0b-original.jpg'
});

data.forEach(item => {
  feed.addItem({
    title: item.title,
    url: item.url
  });
});


const xml = feed.buildXml();

const app = express()

console.log(xml);


const port = 6346;

app.get('/', (request, response) => {
  response.set('Content-Type', 'text/xml');
  
  response.send(xml)
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
