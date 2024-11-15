const RoomInfo = require('../../Models/HotelSchema/RoomsSchema');
const ReservationSchedule = require('../../Models/HotelSchema/RoomSchedules');

const AvailableRoomSearch = async (req,res) => {
    const {checkInDate, checkOutDate, budget} = req.body;
    try{
        // Convert check-in and check-out dates to Date objects
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const gap = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        const roomBudget = await RoomInfo.find({ price: { $lte: budget }});
        const roomAvailable = roomBudget.filter(room =>  {
            return(room.roomLimit > 0)
        });


        return res.status(200).json({roomAvailable,gap:gap});  

    }catch(err){
        res.status(500).json('error weee' , { message: err.message });
    }
}


const NewReservation = async (req,res) => {
    const {checkInDate,checkOutDate,
            selectedRooms,fullName,
            email,phoneNumber,
            daysGap, roomCount,
            guestNumber} = req.body;

    const checkIn = new Date(checkInDate);   // Convert string to Date
    const checkOut = new Date(checkOutDate);

    console.log(selectedRooms.length);
    try{

        for (const [index, reservation] of selectedRooms.entries()) {
            const updatedPrice = ((reservation.price * daysGap) * roomCount[index]) + ((guestNumber[index] - reservation.maximumGuest) * 1200);

            // Create the reservation and update room information
            const newReservation = new ReservationSchedule({
                roomType: reservation.roomType,
                checkInDate:checkIn,
                checkOutDate:checkOut,
                guestName: fullName,
                guestContact: phoneNumber,
                guestEmail: email,
                totalRooms: roomCount[index],
                totalGuests: guestNumber[index],
                totalPrice: updatedPrice,
            });

            await newReservation.save();


            await RoomInfo.findOneAndUpdate(
                { roomType: reservation.roomType },
                { $set: { roomLimit: reservation.roomLimit - roomCount[index] } }
            );
        }

        res.status(200).send({message: 'Reservation Sucessful'});

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const DeleteReservation = async (req,res) => {
    
    try{

       
        
    }catch(err){
        res.status(500).json('error' , { message: err.message });
    }
}

const UpdateReservation = async (req,res) => {
    
    try{

       
        
    }catch(err){
        res.status(500).json('error' , { message: err.message });
    }
}

module.exports = {
    AvailableRoomSearch,
    NewReservation,
    DeleteReservation,
    UpdateReservation
}