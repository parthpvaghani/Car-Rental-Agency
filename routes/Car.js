const express = require('express');
const router = express.Router();

const CarController = require('../controllers/CarController');
const BookController = require('../controllers/BookController');

//Gives Available car
router.get('/cars', CarController.getCars);

//fetches car by seating capacity Example : Give parameter 6Seater or 7Seater or 5Seater
router.get('/cars/seatingcapacity/:seatingcapacity', CarController.getCarsBySeatingCapacity);

//fetches car city Example : Give parameter Surat or Mumbai or Bangalore
router.get('/cars/city/:city', CarController.getCarsByCity);

//add cars to our car collection
router.post('/add_car', CarController.addCar);

//update specific car by taking car id as a params
//before updating it is ensuring that there is no current active booking.
router.put('/edit_car/:Carid', CarController.updateCarInfo);

//delete specific car by taking car id as a params 
//before deletion it is ensuring that there is no current active booking.
router.delete('/delete_car/:Carid', CarController.deleteCar);

//simply returns all bookings.
router.get('/bookedcar',BookController.getBookingStatus);

//it books the car based on provided car id and userid as a params and then it checks whether booking is possible or not
//by veryfication on booking status it checks issue date and return date.
//for now it is taking dates through req.body
router.post('/bookcar/:carid/:userid',BookController.postBookCar);


module.exports = router;
