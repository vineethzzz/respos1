const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [src, out] of process.argv.slice(2).map(a => a.split(':'))) {
    await p.goto('file://' + path.resolve(src));
    await p.pdf({ path: out, format: 'A4', preferCSSPageSize: true, printBackground: true });
    console.log(out, 'done');
  }
  await b.close();
})();
