import { Tours } from "../../models";

export const addNewTour = async (req, res) => {
    try {
        const tour = await Tours.create(req.body)
        res.status(201).json(tour)

        tour.save()
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message,
        })
        
    }
};