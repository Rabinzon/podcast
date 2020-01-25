const Podcast = require('podcast');
const data = require('./data');
const express = require('express');

const feed = new Podcast({
  title: 'Перевод Корана',
  description: 'Смысловой перевод Священного Корана на русский язык. Перевод Эльмира Кулиева.',
  feed_url: 'http://f2f3dff6-e88d-4558-950d-621650c19dd1.pub.cloud.scaleway.com:6346/rss.xml',
  site_url: 'http://f2f3dff6-e88d-4558-950d-621650c19dd1.pub.cloud.scaleway.com:6346/',
  image_url: "https://bts.s3.nl-ams.scw.cloud/quran-ru/img.jpg",
  language: 'ru',
  categories: ['Religion & Spirituality/Islam'],
  pubDate: 'Mon, 20 Jan 2020 06:38:17 +0000',
  itunesAuthor: "Перевод Эльмира Кулиева",
  itunesCategory: [{
    "text": "Religion & Spirituality",
    "subcats": [{
      "text": "Islam"
    }]
  }],
  itunesImage: 'https://bts.s3.nl-ams.scw.cloud/quran-ru/img.jpg'
});

data.forEach(item => {
  feed.addItem({
    title: `${item + 1}. ${item.title}`,
    url: item.url
  });
});

const xml = feed.buildXml();
const app = express();

console.log(xml);

const port = 6346;

app.get('/', (request, response) => {
  response.set('Content-Type', 'text/xml');
  response.send(xml);
});

app.get('/rss.xml', (request, response) => {
  response.set('Content-Type', 'text/xml');
  response.send(xml);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
