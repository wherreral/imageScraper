const cheerio = require('cheerio');
const request = require('request-promise');

async function req(url){
  const $ = await request({
      uri: url,
      transform: body => cheerio.load(body)
  });
  return $;
}



async function init (){
    const $ = await request({
        uri:'https://imagecomics.com/comics/series',
        transform: body => cheerio.load(body)
    });


    //console.log($);

    const list = $('div.grid-x div.cell LI A');
    //console.log(list.html());

    let links = $('ul.all-series li a').map((i, a) => {
      return {
        text: $(a).text(),
        href: $(a).attr('href')
      }
    }).get()

    //console.log(links);

    links.forEach((item, i) => {
        //console.log(item.href);
    });

    for (var i = 0; i < 3; i++) {

      console.log(links[i].href);
      const $ = await request({
          uri:links[i].href,
          transform: body => cheerio.load(body)
      });

      //console.log($('section.comics-grid H2').html());

      let tipos = $('section.comics-grid H2').map((i, a) => {
        console.log('test');
        //
        let test = $(a);
        let libros = test('section.comics-grid .u-pt1 a span').map((i, a) => {
          console.log($(a).text());
          return {
            text: $(a).text()
          }
        }).get();
        //
        return {
          text: $(a).text()
        }
      }).get();

      tipos.forEach((item, i) => {
        console.log(item.text);
      });


      //console.log($('section.comics-grid .u-pt1 a').html());
      let libros = $('section.comics-grid .u-pt1 a span').map((i, a) => {
        return {
          text: $(a).text()
        }
      }).get();

      libros.forEach((item, i) => {
        console.log(item.text);
      });


    }
    //const result = await secontPart(links);


}

init();
