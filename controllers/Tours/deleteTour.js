import { Tours } from "../../models";

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tours.findByIdAndDelete({ _id: id });

    if (!tour) {
      return res.status(404).json({
        message: `A tour with ID: ${id}, not found!`,
      });
    }

    res.status(204).json({
      message: `Tour with ID: ${id}, deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
