import { Testimony } from "../../models";

export const getTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.find({});

    if (!testimonies) {
      return res.status(404).json({
        message: "Nothing found in database",
      });
    }

    res.status(200).json(testimonies);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
