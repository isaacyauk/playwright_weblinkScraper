const { test, expect } = require('@playwright/test');

test('scrape links', async ({ page }) => {

    // Edit the prompt as desired here
    let prompt = ("Dogs");

    // This is the value that the link reconizes as a page number. Increment by 10.
    let pageNum = 0;

    for (let i = 0; i < 10; i++) {

        await page.goto(`https://www.google.com/search?q=${prompt}&start=${pageNum}`);
        const links = await page.$$eval('a', anchors => anchors.map(a => a.href));

        // Filter out YouTube and Google links
        const filteredLinks = links.filter(link => !link.includes('youtube.com') && !link.includes('google.com') && !link.includes('facebook.com'));

        // Print each filtered link
        filteredLinks.forEach(link => console.log(link));
        
        pageNum+=10;
    }
    
    

    
    
});