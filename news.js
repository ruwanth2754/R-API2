const axios = require("axios");
const cheerio = require("cheerio");

async function news() {
  try {
    const url = "https://sinhala.adaderana.lk/";
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    const $ = cheerio.load(response.data);
    const newsPromises = $(".highlight .top-story").map(async (i, el) => {
      let link = $(el).find("h3 a").attr("href");
      let image = $(el).find(".thumb-image img").attr("src");
      let title = $(el).find(".thumb-image img").attr("title");

      if (link && title && image) {
        let fullLink = `https://sinhala.adaderana.lk/${link}`;
        let description = await news2(fullLink);  
        
        return {
          title,
          link: fullLink,
          image,
          description
        };
      }
    }).get();

    const results = await Promise.all(newsPromises); 
    return results.filter(item => item !== undefined);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return [];
  }
}

async function news2(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    const $ = cheerio.load(response.data);
    let newsContent = [];

    $("div.news-content p").each((i, el) => {
      let paragraph = $(el).text().trim();
      if (paragraph) {
        newsContent.push(paragraph);
      }
    });

    return newsContent.join(" "); 

  } catch (error) {
    console.error("Error fetching news details:", error.message);
    return "No description available";
  }
}

// **Test the function**
//news().then(data => console.log(data));

module.exports = {
  news
};