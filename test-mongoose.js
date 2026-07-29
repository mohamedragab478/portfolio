import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || 'portfolio';

const siteConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const SiteConfig = mongoose.models.SiteConfig || mongoose.model('SiteConfig', siteConfigSchema);

async function test() {
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  
  const key = 'contactRelay';
  const data = {
    email: 'test@example.com',
    phone: '1234567890',
  };
  
  const result = await SiteConfig.findOneAndUpdate(
    { key },
    { key, data },
    { upsert: true, new: true, runValidators: true }
  );
  
  console.log('Saved:', result);
  
  const fetched = await SiteConfig.findOne({ key }).lean();
  console.log('Fetched:', fetched);
  
  await mongoose.disconnect();
}

test().catch(console.error);
