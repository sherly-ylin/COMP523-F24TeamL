import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailVerification extends Document {
  email: string;
  verificationCode: string;
  status: 'pending' | 'verified';
  expiresAt: Date;
  createdAt: Date;
}

const EmailVerificationSchema: Schema<IEmailVerification> = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Invalid email format',
      },
      index: true,
    },
    verificationCode: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified'],
      required: true,
      index: true,
    },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// Compound index for common queries
EmailVerificationSchema.index({ email: 1, status: 1 });

export const EmailVerification = mongoose.model<IEmailVerification>(
  'EmailVerification',
  EmailVerificationSchema
);
