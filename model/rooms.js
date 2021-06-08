import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = Schema({
  _id: Schema.Types.ObjectId,
  allFiles: [
    {
      name: {
        type: String,
      },
      language: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
