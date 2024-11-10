const express = require('express');
const router = express.Router();
const RenderRoomController = require('../Controller/RenderRoomsController');

router.get('/api/rooms/:key', RenderRoomController.renderRooms);



module.exports = router;