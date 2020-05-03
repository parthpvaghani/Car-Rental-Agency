
var mongoose = require('mongoose');

BookingStatusModel = require('../models/BookingStatus');

//will execute process to book car on rent
exports.postBookCar = (req,res,next) => {
    const issuedate= req.body.issuedate;
    const returndate = req.body.returndate;
    const userid = mongoose.Types.ObjectId(req.params.userid);
    const carid = mongoose.Types.ObjectId(req.params.carid);

    const bookingStatusModel = new BookingStatusModel({
      Issuedate: issuedate,
      Returndate: returndate,
      UserId: userid,
      CarId: carid
    });

    BookingStatusModel
    .findOne({ CarId: carid })
    .sort('-Returndate')
    .exec(function(err, result) {
        if(err)
            res.send(err);

        //to compare dates    
        var newIssueDateTemp = new Date(issuedate);
        var newReturnDateTemp = new Date(returndate);
        var returnDateTemp = new Date(result.Returndate);
        
        console.log(newIssueDateTemp);
        console.log(returnDateTemp);

        //on same car new issue date should be gt than previous return date on this same car
        if(newIssueDateTemp>returnDateTemp)
        {
            if(newIssueDateTemp>newReturnDateTemp)
            {
                //newly selected issue date should be less than newly selected return date
                res.send('please select issue date and return date wisely');
                return 0;
            }
            bookingStatusModel
            .save()
            .then(bookingStatusModel => {
              console.log('Your Car is booked for Given Dates');
              console.log(bookingStatusModel);
              res.send(bookingStatusModel);
            })
            .catch(err => {
                res.send(err);
              console.log(err);
            });
        }
        else
        {
            //will execute when for chosen date there is already active booking 
            console.log('This car is already booked');
            res.send('This car is already booked');
            return 0;
        }
       
    });
   
};

//will display active bookings within user and car information populated
exports.getBookingStatus = (req,res,next) => {

    BookingStatusModel
    .find()
    .populate('UserId')
    .populate('CarId')
    .then(BookingStatusModel => {
        res.send(BookingStatusModel)
      console.log(BookingStatusModel);
    })
    .catch(err => {
        res.send(err);
      console.log(err);
    });
};
    
