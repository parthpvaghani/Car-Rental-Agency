
var mongoose = require('mongoose'),

CarModel = require('../models/Car');
BookingStatusModel = require('../models/BookingStatus');


//will fetch all the cars
exports.getCars = (req, res) => {

  CarModel
  .find({})
  .exec(function(err, CarModel){
    if (err)
      res.send(err);
    res.json(CarModel);
  });
};

//will fetch car by given city filter
exports.getCarsByCity = (req, res) => {

  const city = req.params.city;

  CarModel
  .find({City : city})
  .exec(function(err, CarModel){
    if (err)
      res.send(err);
    res.json(CarModel);
  });
};

//will fetch car by given seating capacity filter
exports.getCarsBySeatingCapacity = (req, res) => {

  const Seatingcapacity= req.params.seatingcapacity;

  CarModel
  .find({SeatingCapacity : Seatingcapacity})
  .exec(function(err, CarModel){
    if (err)
      res.send(err);
    res.json(CarModel);
  });
};

//addition of car
exports.addCar = (req, res) => {
  var new_car = new CarModel(req.body);
  console.log(new_car);
  new_car.save((err, CarModel) => {
 console.log(CarModel);
    if (err)
      res.send(err);
    res.json(CarModel);
  });
};

//updating car information
exports.updateCarInfo = (req, res) => {

  var id = mongoose.Types.ObjectId(req.params.Carid);

  BookingStatusModel
  .exists({ CarId: id}, (err, result) => 
    {
          if (err) 
          {
            res.send(err);
          } 
          else
          {
              if(result)
              {
                  res.send('This Car is Booked By someone else please wait for trip completion');
                  return 0;
              }
              else
              {
                CarModel.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, CarModel) => {
                  if (err)
                    res.send(err);
                  res.json({message : 'car details successfully Updated'});
                });
              }
          }
    });
};


//deletion of car by ensuring other points which make ensure is there any active booking or not?
exports.deleteCar = (req, res) => {

  var id = mongoose.Types.ObjectId(req.params.Carid);

  //check whether there is any booking made or what ---> for car which we gonna delete
  BookingStatusModel
  .exists({ CarId: id}, (err, result) => 
    {
          if (err) 
          {
            res.send(err);
          } 
          else
          {
              if(result)
              {
                  res.send('This Car is Booked By someone else please wait for trip completion');
                  return 0;
              }
              else
              {
                CarModel.remove({
                  _id: id
                }, (err, CarModel) => {
                  if (err)
                    res.send(err);
                  res.json({message : 'car details successfully deleted'});
                });
              }
          }
    });


};