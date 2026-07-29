import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  fullName: { type: String, trim: true, default: '' },
  jobTitle: { type: String, trim: true, default: '' },
  bio: { type: String, trim: true, default: '' },
  resumeUrl: { type: String, trim: true, default: '' },
  profileImageUrl: { type: String, trim: true, default: '' },
  heroImage: { type: String, trim: true, default: '' },
  siteLogoUrl: { type: String, trim: true, default: '' },
  siteTitle: { type: String, trim: true, default: '' },
  typewriterWords: { type: [String], default: [] },
  socialLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
  heroStats: { type: mongoose.Schema.Types.Mixed, default: [] },
}, {
  timestamps: true,
  strict: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Clear cached model to ensure schema updates take effect across dev hot reloads
if (mongoose.models && mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export default mongoose.model('Settings', settingsSchema);
