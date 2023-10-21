import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken, admin } from "../middleware";
import { uploads } from "../middleware/multer";

const toursRouter = express.Router();

import {
  getOneTour,
  getTours,
  addNewTour,
  deleteTour,
  updateTour,
  modifyTour,
} from "../controllers/Tours";

/**
 * @swagger
 * components:
 *   schemas:
 *     tours:
 *       type: object
 *       required:
 *         - destination
 *         - backDropImage
 *         - title
 *         - description
 *         - duration
 *         - groupSize
 *         - price
 *         - discount
 *         - tourType
 *         - departure
 *         - seats
 *         - fromMonth
 *         - toMonth
 *         - departureTime
 *         - returntime
 *         - gallery
 *         - priceIncluded
 *         - priceNotIncluded
 *       properties:
 *         destination:
 *           type: string
 *           description: The destination of the tour
 *         backDropImage:
 *           type: string
 *           description: The backdrop image for the tour
 *         title:
 *           type: string
 *           description: The title of the tour
 *         description:
 *           type: string
 *           description: A brief description of the tour
 *         duration:
 *           type: string
 *           description: The duration of the tour
 *         groupSize:
 *           type: string
 *           description: The group size for the tour
 *         price:
 *           type: string
 *           description: The price of the tour
 *         discount:
 *           type: string
 *           description: Any discount available for the tour
 *         tourType:
 *           type: string
 *           description: The type of tour (e.g., wildlife, cultural)
 *         departure:
 *           type: string
 *           description: The departure location for the tour
 *         seats:
 *           type: string
 *           description: The number of available seats
 *         fromMonth:
 *           type: string
 *           description: The starting month of the tour
 *         toMonth:
 *           type: string
 *           description: The ending month of the tour
 *         departureTime:
 *           type: string
 *           description: The departure time for the tour
 *         returntime:
 *           type: string
 *           description: The return time for the tour
 *         gallery:
 *           type: string
 *           description: A gallery of images related to the tour
 *         priceIncluded:
 *           type: string
 *           description: What's included in the tour price
 *         priceNotIncluded:
 *           type: string
 *           description: What's not included in the tour price
 *       example:
 *         destination: "Rwanda, East Africa"
 *         backDropImage: "Beautiful_Rwanda.jpeg or https://www.google.com/url?sa=i&url=https%3A%2F%2Frwandaecocompany.com%2Ftop-reasons-why-tourists-visit-rwanda%2F&psig=AOvVaw2VInTRjkQDtoD24gVLg3ay&ust=1697968429656000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDPzrvvhoIDFQAAAAAdAAAAABAE"
 *         title: "Rwanda's Natural Wonders Expedition"
 *         description: "Explore the breathtaking landscapes and wildlife of Rwanda, known as the 'Land of a Thousand Hills.'"
 *         duration: "10 days, 9 nights"
 *         groupSize: "Small group tour, limited to 12 travelers for an intimate experience"
 *         price: "$3,499 per person"
 *         discount: "15% off for bookings made before the end of the year"
 *         tourType: "Wildlife and Nature"
 *         departure: "Kigali International Airport, Rwanda"
 *         seats: "6 seats remaining"
 *         fromMonth: "June"
 *         toMonth: "September"
 *         departureTime: "9:00 AM (local time)"
 *         returntime: "5:00 PM (local time)"
 *         gallery: "https://www.visitrwanda.com/destinations/ or images.jpg, 2022-12-26.jpg,..."
 *         priceIncluded: "Accommodation in eco-friendly lodges, All meals during the tour, Gorilla trekking permits, Game drives and safaris, guides and naturalists, All in-country transportation."
 *         priceNotIncluded: "International airfare to and from Rwanda, Visa fees (if applicable), Personal expenses, Travel insurance, Gratuities for guides and staff."
 *     tourEdit:
 *       type: object
 *       required:
 *         - destination
 *         - backDropImage
 *         - title
 *         - description
 *         - duration
 *         - groupSize
 *         - price
 *         - discount
 *         - tourType
 *         - departure
 *         - seats
 *         - fromMonth
 *         - toMonth
 *         - departureTime
 *         - returntime
 *         - gallery
 *         - priceIncluded
 *         - priceNotIncluded
 *       properties:
 *         destination:
 *           type: string
 *           description: The destination of the tour
 *         backDropImage:
 *           type: string
 *           description: The backdrop image for the tour
 *         title:
 *           type: string
 *           description: The title of the tour
 *         description:
 *           type: string
 *           description: A brief description of the tour
 *         duration:
 *           type: string
 *           description: The duration of the tour
 *         groupSize:
 *           type: string
 *           description: The group size for the tour
 *         price:
 *           type: string
 *           description: The price of the tour
 *         discount:
 *           type: string
 *           description: Any discount available for the tour
 *         tourType:
 *           type: string
 *           description: The type of tour (e.g., wildlife, cultural)
 *         departure:
 *           type: string
 *           description: The departure location for the tour
 *         seats:
 *           type: string
 *           description: The number of available seats
 *         fromMonth:
 *           type: string
 *           description: The starting month of the tour
 *         toMonth:
 *           type: string
 *           description: The ending month of the tour
 *         departureTime:
 *           type: string
 *           description: The departure time for the tour
 *         returntime:
 *           type: string
 *           description: The return time for the tour
 *         gallery:
 *           type: string
 *           description: A gallery of images related to the tour
 *         priceIncluded:
 *           type: string
 *           description: What's included in the tour price
 *         priceNotIncluded:
 *           type: string
 *           description: What's not included in the tour price
 *       example:
 *         Destination: "Kigali, Rwanda"
 *         backDropImage: My_city_kigali.png or https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.loyaltoursandsafaris.com%2Fwp-content%2Fuploads%2F2021%2F03%2Fkigali-city-Rwanda.jpg&tbnid=j1x6H0_kpvUdUM&vet=12ahUKEwjBjP6574aCAxWPV6QEHc3eAi8QMygbegUIARCrAQ..i&imgrefurl=https%3A%2F%2Fwww.loyaltoursandsafaris.com%2F9-reasons-to-visit-rwanda%2F&docid=NqHfcF5ofYjLMM&w=850&h=500&q=Visit%20Rwanda&ved=2ahUKEwjBjP6574aCAxWPV6QEHc3eAi8QMygbegUIARCrAQ
 *         Tour Title: "Ultimate Kigali Adventure"
 *         Description: "Embark on an unforgettable journey through the vibrant city of Kigali, Rwanda. From exploring its rich history and culture to experiencing its stunning natural beauty, this tour has something to offer everyone."
 *         Duration: "7 days/6 nights"
 *         Group Size: "10-16 people"
 *         Price: "$2,500 per person"
 *         Discount: "10% off for bookings made 60 days in advance"
 *         Tour Type: "Small group tour"
 *         Departure Location: "Kigali International Airport (KGL)"
 *         Available Seats: "12 available"
 *         From Month: "January"
 *         To Month: "December"
 *         Departure Time: "9:00 AM (local time)"
 *         Return Time: "6:00 PM (local time)"
 *         gallery: https://www.visitrwanda.com/destinations/kigali or Kigali_memorial_genocide_against_Tutsi.jpg, My_city_kigali.png, etc
 *         Price Included: Accommodation in eco-friendly lodges, All meals during the tour, Gorilla trekking permits, Game drives and safaris, guides and naturalists, All in-country transportation.
 *         PriceNotIncluded: International airfare to and from Rwanda, Visa fees (if applicable), Personal expenses, Travel insurance, Gratuities for guides and staff.
 *         itinerary: "Day 1: Arrival in Kigali, Day 2: Explore Volcanoes National Park, Day 3: Gorilla Trekking, Day 4: Discover Lake Kivu, Day 5: Akagera Safari, Day 6: Departure"
 *         activities: "Gorilla trekking, Safari drives, Bird watching, Hiking"
 *         highlights: "Volcanoes National Park, Lake Kivu, Akagera National Park"
 */

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: The tour managing API
 */

/**
 * @swagger
 * /holidays/tours/gettours:
 *   get:
 *     summary: Returns the list of all the tours
 *     tags: [Tours]
 *     responses:
 *       200:
 *          description: The list of the tours found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/tours'
 *       204:
 *          description: No any type of a tour in the database
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

toursRouter.get("/gettours", getTours);

/**
 * @swagger
 * /holidays/tours/gettour/{id}:
 *   get:
 *     summary: Get the tour type by id
 *     tags: [Tours]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The tour id
 *     responses:
 *       200:
 *          description: The tour found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *       204:
 *          description: No any type of tour in the database
 *       404:
 *          description: The type of such tour was not found
 *       500:
 *          description: Internal Server Error
 */

toursRouter.get("/gettour/:id", getOneTour);

/**
 * @swagger
 * /holidays/tours/addtour:
 *   post:
 *     summary: Create a new type of tour data
 *     tags: [Tours]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *     responses:
 *       201:
 *          description: The new tour data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *       500:
 *          description: Internal Server Error
 */

toursRouter.post("/addtour", uploads, addNewTour);

/**
 * @swagger
 * /holidays/tours/deletetour/{id}:
 *   delete:
 *     summary: Delete the tour data by id
 *     tags: [Tours]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The tour id
 *     responses:
 *       200:
 *          description: The type of a tour was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *       204:
 *          description: No any type of a tour in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The tour was not found
 *       500:
 *          description: Internal Server Error
 */

toursRouter.delete("/deletetour/:id", verifyToken, deleteTour);

/**
 * @swagger
 * /holidays/tours/updatetour/{id}:
 *   patch:
 *     summary: Update the tour data by id
 *     tags: [Tours]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The tour id
 *     responses:
 *       200:
 *          description: The tour was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tours'
 *       204:
 *          description: No any type of tour in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The tour was not found
 *       500:
 *          description: Internal Server Error
 */

toursRouter.patch("/updatetour/:id", verifyToken, updateTour);

/**
 * @swagger
 * /holidays/tours/modifytour/{id}:
 *   put:
 *     summary: Modify the structure of the type of a tour by id
 *     tags: [Tours]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tourEdit'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The tour id
 *     responses:
 *       200:
 *          description: The type of a tour was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tourEdit'
 *       204:
 *          description: No any type of tour in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The tour was not found
 *       500:
 *          description: Internal Server Error
 */

toursRouter.put("/modifytour/:id", verifyToken, modifyTour);

export default toursRouter;
