const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollUpAndDown(page) {
  try {
    await page.evaluate(`window.scrollTo({top: 0, behavior: 'smooth'})`);

    const previousHeight = await page.evaluate("document.body.scrollHeight");

    await page.evaluate(
      `window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})`
    );

    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    );
  } catch (err) {
    console.log("got err while scrollng");
  }
}

async function login(browser) {
  const page = await browser.newPage();
  await page.goto("https://m.facebook.com");

  // 'm_login_email'
  // 'm_login_password'

  await page.evaluate(() => {
    // eslint-disable-next-line
    document.querySelector("#m_login_email").value = "***";
    // eslint-disable-next-line
    document.querySelector("#m_login_password").value = "***";
    // eslint-disable-next-line
    document.querySelector("#u_0_4 > button").click();
  });

  await sleep(3000);
  await page.evaluate(() => {
    // eslint-disable-next-line
    document
      .querySelector(
        "#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(2) > form > div > button"
      )
      .click();
  });

  await sleep(3000);
  await page.close();
  return "success";
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const ret = await login(browser);
  if (ret === "success") {
    const page = await browser.newPage();
    await page.goto("https://instagram.com");
    await sleep(3000);
    try {
      await page.evaluate(() => {
        // eslint-disable-next-line
        document.querySelector(".L3NKy").click();
        // eslint-disable-next-line
        document.querySelector(".sqdOP").click();
        // eslint-disable-next-line
        document.querySelector(".y3zKF").click();
      });
    } catch (err) {
      console.log("err occured while login");
    }
    await sleep(3000);
    try {
      await page.evaluate(() => {
        // eslint-disable-next-line
        document.querySelector(".HoLwm").click();
      });
    } catch (err) {
      console.log("err occured while login");
    }
    const response = await page.content();
    const $ = await cheerio.load(response, {
      normalizeWhitespace: true
    });

    const aHandlers = await page.$x("//a[contains(text(), 'ollow')]");
    const divHandlers = await page.$x("//div[contains(text(), 'ollow')]");
    const buttonHandlers = await page.$x("//button[contains(text(), 'ollow')]");
    console.log(
      aHandlers.length,
      "||",
      divHandlers.length,
      "||",
      buttonHandlers.length
    );
    try {
      if (aHandlers.length > 0) {
        for (a of aHandlers) {
          console.log("clicked a");
          a.click();
        }
      } else {
        throw new Error("Link not found");
      }
    } catch (err) {}

    try {
      if (divHandlers.length > 0) {
        for (b of divHandlers) {
          console.log("clicked div");
          a.click();
        }
      } else {
        throw new Error("Link not found");
      }
    } catch (err) {}

    try {
      if (buttonHandlers.length > 0) {
        for (a of buttonHandlers) {
          console.log("clicked button");
          a.click();
        }
      } else {
        throw new Error("Link not found");
      }
    } catch (err) {}

    await sleep(3000);
    await scrollUpAndDown(page);
    // dialog hide section
    await sleep(3000);
    await scrollUpAndDown(page);
    await sleep(3000);
    await scrollUpAndDown(page);
    await sleep(3000);

    // div[contains(string(), "Elangovan")]
  }
}

main();

// page.on("dialog", async dialog => {
//     await dialog.dismiss();
//   });