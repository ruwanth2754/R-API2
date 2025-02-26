const axios = require("axios");
const cheerio = require("cheerio");

// SL Sub Search
async function slsubA(q) {
  try {
    const url = `https://sinhalasub.lk/?s=${q}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);
    const results = [];

    $("div.result-item").each((i, el) => {
      let title = $(el).find("div.details div.title a").text().trim();
      let link = $(el).find("div.details div.title a").attr("href");
      let inco = $(el).find("div.image div a img").attr("src");
      let imdb = $(el).find("div.details div.meta span.rating").text().trim();
      let year = $(el).find("div.details div.meta span.year").text().trim();

      if (title && link && inco && imdb && year) {
        results.push({ title, imdb, year, inco, link });
      }
    });
    return results;
  } catch (error) {
    console.error("Error scraping data:", error.message);
    return [];
  }
}

// SL Sub Movie Details 
async function MoviePage(movieUrl) {
  try {
    if (!movieUrl) throw new Error("No movie URL provided");
    
    const response = await axios.get(movieUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);

    // Extract description
    const description = $("div.wp-content strong span").text().trim();

    // Extract download links
    let downloadLinks = [];
    $("div.links_table tbody tr").each((i, el) => {
      let link = $(el).find("td a").attr("href");
      let text = $(el).find("td a").text().trim();

      if (link && text.includes("Download")) {
        downloadLinks.push({ text, link });
      }
    });

    return { description, downloadLinks };
  } catch (error) {
    console.error("Error scraping data:", error.message);
    return { description: "No data", downloadLinks: [] };
  }
}

// Extract Mega.nz Download Link
async function DownloadLink(dlurl) {
  try {
    if (!dlurl) throw new Error("No download URL provided");

    const response = await axios.get(dlurl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);

    console.log("⏳ Waiting 17 seconds...");

    return new Promise((resolve) => {
      setTimeout(() => {
        let downloadLink = $("a#link").attr("href");
        if (downloadLink) {
          resolve({ "dl": downloadLink });
        } else {
          resolve({ error: "Download Link Not Found!" });
        }
      }, 17000);
    });
  } catch (error) {
    console.error("Error scraping data:", error.message);
    return { error: "Failed to fetch download link" };
  }
}

module.exports = { DownloadLink, MoviePage, slsubA };