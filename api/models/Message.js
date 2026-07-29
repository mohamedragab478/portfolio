import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  read: { type: Boolean, default: false },
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

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
