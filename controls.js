import Room from "./models/roomSchema.js";
import Customer from "./models/customerSchema.js";

export async function CreateRoom(req, res) {
  const { numberOfSeatsAvailable, amenitiesInRoom, pricePerHour } = req.body;
  try {
    var length = await Room.countDocuments()
      .then(async (count_documents) => {
        console.log(count_documents);
        const newRoom = new Room({
          numberOfSeatsAvailable,
          amenitiesInRoom,
          pricePerHour,
          roomName: count_documents + 101,
          roomId: count_documents + 1,
          date: "",
          startTime: "",
          customerName: "",
          endTime: "",
          bookedStatus: false,
        });
        await newRoom.save();
        console.log(newRoom);
        res
          .status(200)
          .json({ status: "success", message: "Room created successfully" });
      })
      .catch((err) => {
        console.log(err.Message);
      });
  } catch (error) {
    res.json(error);
  }
}
export async function BookRoom(req, res) {
  try {
    const { customerName, roomId, date, startTime, endTime } = req.body;
    let roomBooked;
    try {
      roomBooked = await Room.findOne({ roomId: roomId });
    } catch (err) {
      return console.log(err);
    }
    if (roomBooked === null) {
      res.status(404).json({ message: "Invalid Room Id" });
    }
    console.log(roomBooked.bookedStatus);
    if (roomBooked.bookedStatus === true) {
      return res.json({
        massage: "Room already booked. Please try another room.",
      });
    }

    const bookRoom = new Customer({
      customerName,
      roomId,
    });
    await bookRoom.save();
    const updateRoom = await Room.findOneAndUpdate(
      { roomId },
      {
        $set: {
          customerName,
          date,
          startTime,
          endTime,
          bookedStatus: true,
        },
      }
    );
    res
      .status(200)
      .json({ status: "success", message: "Room booked successfully" });
  } catch (error) {
    console.log(error);
  }
}
export async function GetAllRooms(req, res) {
  try {
    const allRooms = await Room.find(
      {},
      {
        roomName: 1,
        bookedStatus: 1,
        customerName: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
      }
    ).catch((err) => console.log(err));
    console.log(allRooms);
    res.status(200).json({
      status: "success",
      roomData: allRooms,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function GetAllCustomers(req, res) {
  try {
    const allCustomers = await Room.find(
      { bookedStatus: true },
      {
        customerName: 1,
        roomName: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
      }
    ).catch((err) => console.log(err));
    console.log(allCustomers);
    res.status(200).json({
      status: "success",
      roomData: allCustomers,
    });
  } catch (error) {
    console.log(error);
  }
}
