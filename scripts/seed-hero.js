/**
 * Seed script: populates the 'hero' config document in MongoDB.
 * Run with: node scripts/seed-hero.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME  = process.env.MONGO_DB_NAME || 'portfolio';

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set in .env');
  process.exit(1);
}

const siteConfigSchema = new mongoose.Schema({
  key:  { type: String, required: true, unique: true, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

const heroData = {
  name: 'AMIR ELREFAI',
  title: 'AI & ML Engineer',
  bio: 'Passionate AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI. Focused on architecting intelligent AI Agents, building robust RAG systems, and deploying production-ready models.',
  cvUrl: 'https://drive.google.com/file/d/1vdfjkWTQ_1l7Jugs-vbgyxbe_0DTe4pk/view?usp=sharing',
  githubUrl: 'https://github.com/amerelfalwo',
  profileImageUrl: '/hero1.png',
  siteLogoUrl: '',
  typewriterWords: [
    'AI & ML Engineer',
    'Deep Learning Specialist',
    'Computer Vision Expert',
    'Data Architect'
  ],
  heroStats: [
    { title: '1+ Year XP', description: 'AI & CV Specialist', iconName: 'Brain' },
    { title: '8+ Certifications', description: 'Industry credentials', iconName: 'Award' },
    { title: 'Linux Admin', description: 'Systems Optimization', iconName: 'Terminal' },
    { title: 'IoT & Edge AI', description: 'Smart Ecosystems', iconName: 'Cpu' },
  ]
};

async function seed() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME, serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected!');

    const result = await SiteConfig.findOneAndUpdate(
      { key: 'hero' },
      { key: 'hero', data: heroData },
      { upsert: true, new: true, runValidators: true }
    );
    console.log('✅ Hero config seeded successfully!');
    console.log('   Document ID:', result._id.toString());
    console.log('   Data keys:', Object.keys(result.data));

    // Verify by reading it back
    const verify = await SiteConfig.findOne({ key: 'hero' }).lean();
    console.log('\n📖 Verification - reading back from DB:');
    console.log('   Name:', verify.data.name);
    console.log('   Bio:', verify.data.bio?.substring(0, 50) + '...');
    console.log('   Typewriter words:', verify.data.typewriterWords);
    console.log('   Stats count:', verify.data.heroStats?.length);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected.');
  }
}

seed();
