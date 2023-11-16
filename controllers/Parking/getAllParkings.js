import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getTotalParking = catchAsyncError(async (req, res, next) => {
  const availableParkingSpots = await Parkings.find({});

  if (!availableParkingSpots) {
    return next(new errorHandler(`No any parking spot found!`, 404));
  }

  // Group parking spots by building name
  const parkingSpotsByBuilding = availableParkingSpots.reduce(
    (acc, parkingSpot) => {
      const buildingName = parkingSpot.building;

      if (!acc[buildingName]) {
        acc[buildingName] = [];
      }

      acc[buildingName].push(parkingSpot);
      return acc;
    },
    {}
  );

  // Calculate totals for each building
  const buildingTotals = Object.entries(parkingSpotsByBuilding).map(
    ([buildingName, buildingSpots]) => {
      const totalSpots = buildingSpots.length;
      const totalReserved = buildingSpots.filter(
        (parkingSpot) => parkingSpot.availability === "reserved"
      ).length;
      const totalAvailable = buildingSpots.filter(
        (parkingSpot) => parkingSpot.availability === "available"
      ).length;

      return {
        buildingName,
        totalSpots,
        totalReserved,
        totalAvailable,
        buildingSpots,
      };
    }
  );

  const totalBuilding = buildingTotals.length;
  const totalSpots = availableParkingSpots.length;
  const totalReserved = availableParkingSpots.filter(
    (parkingSpot) => parkingSpot.availability === "reserved"
  ).length;
  const totalAvailable = availableParkingSpots.filter(
    (parkingSpot) => parkingSpot.availability === "available"
  ).length;

  res.status(200).json({
    data: {
      totalBuilding: totalBuilding,
      allParkingParkingSpots: totalSpots,
      allReservedParkingSpots: totalReserved,
      availableParking: totalAvailable,
    },
    buildingTotals,
  });
});

// export const getTours = (req, res) => {
//   res.status(200).json(res.paginatedResults);
// };
