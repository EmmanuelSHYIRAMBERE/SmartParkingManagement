import { Tours } from "../../models";

export const getOneTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tours.findOne({ _id: id });

    if (!tour) {
      return res.status(404).json({
        message: `A tour with ID: ${id}, not found!`,
      });
    }

    res.status(200).json({ tour });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
