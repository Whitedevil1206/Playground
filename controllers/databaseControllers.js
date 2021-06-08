import Room from '../model/rooms.js';
import mongoose from 'mongoose';

export const createRoom = async (req, res) => {
  const newRoom = new Room({
    _id: new mongoose.Types.ObjectId(),
    allFiles: [
      {
        name: 'script.js',
        language: 'javascript',
        value: '//javascript file',
      },
    ],
  });

  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateFiles = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Room Id not valid');

  const room = await Room.findById(id);
  try {
    room.allFiles = req.body;
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFiles = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Room Id not valid');

  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
