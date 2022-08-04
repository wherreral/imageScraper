const cheerio = require('cheerio');
const request = require('request-promise');

async function init (){
    const $ = await request({
        uri:'https://imagecomics.com/comics/series',
        transform: body => cheerio.load(body)
    });
    //console.log($);

    const list = $('div.grid-x div.cell LI A');
    console.log(list.html());

    let links = $('ul.all-series li a').map((i, a) => {
      return {
        text: $(a).text(),
        href: $(a).attr('href')
      }
    }).get()
    console.log(links);
}

init();
