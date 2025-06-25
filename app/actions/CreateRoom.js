'use server'

import { connectDB } from "@/lib/mongoose"; // Adjust path to your mongoose connection
import Room from "@/models/Room"; // Adjust path to your schema

export async function createRoom(data) {
  try {
    await connectDB();

    const existingRoom = await Room.findOne({ name: data.name });

    if (!existingRoom) {
      // No room found → create new
      await Room.create(data);
      return { success: true, message: 'Room created' };
    }

    // Compare fields
    const hasChanged =
      existingRoom.image !== data.image ||
      existingRoom.type !== data.type ||
      existingRoom.price !== Number(data.price) ||
      existingRoom.description !== data.description ||
      existingRoom.offprice !== Number(data.offprice) ||
      JSON.stringify(existingRoom.icons || []) !== JSON.stringify(data.icons || []);

    if (!hasChanged) {
      return { success: true, message: 'No changes detected' };
    }

    // Update only if data changed
    await Room.updateOne(
      { name: data.name },
      {
        $set: {
          image: data.image,
          type: data.type,
          price: Number(data.price),
          description: data.description,
          offprice: Number(data.offprice) || null,
          icons: data.icons || [],
        },
      }
    );

    return { success: true, message: 'Room updated' };
  } catch (error) {
    console.error('[ROOM_ACTION_ERROR]', error);
    return { success: false, message: 'Server error' };
  }
}

export async function deleteRoom(roomName) {
  try {
    await connectDB();

    const result = await Room.deleteOne({ name: roomName });
    if (result.deletedCount === 0) {
      return { success: false, message: 'Room not found' };
    }
    return { success: true, message: 'Room deleted' };
  } catch (error) {
    console.error('[ROOM_DELETE_ERROR]', error);
    return { success: false, message: 'Server error' };
  }
  }