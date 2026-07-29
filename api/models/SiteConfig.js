import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, {
  timestamps: true,
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

export default mongoose.models.SiteConfig || mongoose.model('SiteConfig', siteConfigSchema);
