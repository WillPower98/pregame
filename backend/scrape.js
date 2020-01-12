const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('menu.csv');

//Write Headers
writeStream.write(`Drink, Price $, Size \n`);

request('https://www.binnys.com/spirits', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        $('.product.details.product-item-details.text-align-center').each((i, drink) => {
            const name = $(drink).find('.product-item-link').text().trim();
            price = $(drink).find('.price').text().replace(/$/, '');

            if($(drink).find('.special-price') != null){
                price = $(drink).find('.special-price').find('.price').text().replace(/$/, '');
            }

            const size = $(drink).find('.size-pack-attr').text().trim();
            
           //write row to CVS
            writeStream.write(`${name}, ${price}, ${size} \n`);
        });
        console.log('scraping done')
    }
});