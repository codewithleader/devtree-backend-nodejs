import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  id: string; // Aquí si se tiene ya el id (no es opcional)
  nickname: string;
  name: string;
  email: string;
  // Los opcionales van al final
  password?: string;
  bio?: string;
  imageUrl?: string;
  imagePublicId?: string;
  links?: string;
}

const userSchema = new mongoose.Schema(
  {
    // nickname = handle
    nickname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // Evita traer el password en una consulta
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imagePublicId: {
      type: String,
      default: '',
    },
  },
  { collection: 'users' }
);

export const User = mongoose.model<IUser>('User', userSchema);
// mongoose.models.User || mongoose.model('User', userSchema);

// userSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });
