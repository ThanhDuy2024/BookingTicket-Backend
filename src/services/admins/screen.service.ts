import { ScreenDto } from "../../interfaces/screen.interface";
import { Screens } from "../../models/Screens.model";
import { Seats } from "../../models/Seates.model";

export const createScreenService = async (data: ScreenDto, adminId: any) => {
  try {
    const screen = await Screens.create({
      name: data.name,
      seatNumber: data.seatNumber,
      updatedBy: adminId,
      createdBy: adminId,
    });

    for (let i = 1; i <= data.seatNumber; i++) {
      await Seats.create({
        name: `${data.name}-${i}`,
        screenId: screen.dataValues.id,
        updatedBy: adminId,
        createdBy: adminId,
      })
    }
    return {
      status: 200,
      code: "success",
      message: "Screen create successfully!"
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "error screen service!"
    }
  }
}