import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password; // Never expose password in JSON output
      return ret;
    }
  }
});

export default mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
