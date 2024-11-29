import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: 'users' }
);

interface IUser {
  name: string;
  email: string;
  password: string;
}

const User = mongoose.model<IUser>('User', userSchema);
// mongoose.models.User || mongoose.model('User', userSchema);

// userSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

export default User;
