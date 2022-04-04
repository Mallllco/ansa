const { default: axios } = require("axios");
const cheerio = require('cheerio');
const fs = require('fs');
const prompt = require('prompt-sync')();


axios.get('https://www.ansa.it/')
    .then((response) => {
        let scrape = cheerio.load(response.data);

        
        let articles = [];
        scrape('.news').map((index, element) => {
            articles.push (
                scrape(element).find('h3').text().trim()
                + '\n' +
                scrape(element).find('p').text().trim()
                + '\n')
        });

        let choice = prompt('Scegli la parola chiave: ');
        articles = articles.slice(0, 5).filter(article => {
            return article.includes(choice);
        });
        
        fs.writeFile('./artocoli.txt', articles.join('\n'), (error => {
            if (error) throw error;
        }));
    })
.catch((error) =>{
    console.log(error);
});

