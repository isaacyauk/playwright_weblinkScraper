const { test, expect } = require('@playwright/test');
const fs = require('fs');  // File System module for writing to a file


test('scrape links', async ({ page }) => {
    let prompt = ("Isaac Yauk"); // Edit the prompt as desired here
    let pageNum = 0; // This is the value that the link reconizes as a page number. Increment by 10.
    const outputPath = './scrape-results.txt';
    fs.writeFileSync(outputPath, '', 'utf-8'); // Clears the output file before writing.
    const uniqueLinks = new Set(); // Creates a set for scrape results.

    for (let i = 0; i < 10; i++) {

        await page.goto(`https://www.google.com/search?q=${prompt}&start=${pageNum}`);
        const links = await page.$$eval('a', anchors => anchors.map(a => a.href));

        // Filter out YouTube and Google links
        const filteredLinks = links
            .filter(link => !link.includes('youtube.com') && !link.includes('google.com') && !link.includes('facebook.com'));

        // Print each filtered link to the file
        filteredLinks.forEach(link => {
            if (link.trim()) { // Check that link is not empty and append it to the file.
                uniqueLinks.add(link.trim());
            }
        });
        
        pageNum+=10;
    }    

    uniqueLinks.forEach(link => {
        fs.appendFileSync(outputPath, link + '\n', 'utf-8');
    });
});