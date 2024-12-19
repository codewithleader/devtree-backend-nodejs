import { IUser } from '@src/contexts/users/domain';
import mongoose from 'mongoose';

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
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { collection: 'users' }
);

const User = mongoose.model<IUser>('User', userSchema);
// mongoose.models.User || mongoose.model('User', userSchema);

// userSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

export default User;
