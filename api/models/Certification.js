import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  date: { type: String, trim: true, default: '' },
  verificationUrl: { type: String, trim: true, default: '' },
  issuerLogoUrl: { type: String, trim: true, default: '' },
  credentialUrl: { type: String, trim: true, default: '' },
  image: { type: String, trim: true, default: '' },
  skills: { type: [String], default: [] },
  isVerified: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
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

export default mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
