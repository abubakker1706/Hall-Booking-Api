import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    numberOfSeatsAvailable: {
      type: String,
      required: true,
    },
    amenitiesInRoom: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: String,
      required: true,
    },
    roomName: {
      type: Number,
    },
    customerName: {
      type: String,
    },
    bookedStatus: {
      type: Boolean,
    },
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    roomId: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
