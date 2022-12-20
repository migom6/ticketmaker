const puppeteer = require("puppeteer");

const sharp = require("sharp");

var sizeOf = require("image-size");

// original image
let originalImage = "originalImage.jpg";

// file name for cropped image
let outputImage = "croppedImage.jpg";

let outputConcat = "";

const ticketWidth = 990;
const ticketHeight = 320;

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto("http://localhost:3000/tickets");
  await page.screenshot({ path: "originalImage.png", fullPage: true });
  await browser.close();

  var dimensions = sizeOf("originalImage.png");

  console.log(dimensions.width, dimensions.height);

  const cropImage = (newHeight, newTop, imageIndex) => {
    sharp("originalImage.png")
      .extract({
        left: 0,
        width: ticketWidth,
        height: newHeight,
        top: newTop,
      })
      .png()
      .toFile(`./tickets/${imageIndex + 1}.png`);
  };

  var remainingTop = dimensions.height;
  var cumulitiveTop = 0;

  var amountOfImages = Math.ceil(dimensions.height / ticketHeight);

  for (let i = 0; i < amountOfImages; i++) {
    if (remainingTop >= ticketHeight) {
      cropImage(ticketHeight, cumulitiveTop, i);
      //printText(1080, cumulitiveTop, i);
    } else {
      cropImage(remainingTop, dimensions.height - remainingTop, i);
      //printText(remainingTop, dimensions.height - remainingTop, i);

      break;
    }

    remainingTop = remainingTop - ticketHeight;
    cumulitiveTop += ticketHeight;
  }
}

run();
