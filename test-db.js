import { connectDb } from './api/_db.js';
import SiteConfig from './api/models/SiteConfig.js';
(async () => {
  await connectDb();
  console.log(await SiteConfig.findOne({ key: 'contactRelay' }).lean());
  process.exit(0);
})();
