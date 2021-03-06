const asyncHandler = require("../../middlewares/async");
const Event = require("../../models/Event/Event");

const methods = {
  //----- Create Event -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description } = req.body;
      let video, image;

      if (req.files.video) {
        video = req.files.video[0].key;
      }
      if (req.files.image) {
        image = req.files.image[0].key;
      }
      const ownerId = req.user._id;
      const newDescription = description.replace(/(<([^>]+)>)/gi, "");

      // Saving User in DataBase
      const event = await Event.create({
        title,
        description: newDescription,
        image,
        video,
        owner: ownerId,
      });

      return res.status(200).json({ event: event });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Event -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, eventId } = req.body;
      let video, image;

      if (req.files.video) {
        video = req.files.video[0].key;
      }
      if (req.files.image) {
        image = req.files.image[0].key;
      }
      let event = await Event.findById(eventId);

      if (title) {
        event.title = title;
      }
      if (description) {
        const newDescription = description.replace(/(<([^>]+)>)/gi, "");
        event.description = newDescription;
      }
      if (image) {
        event.image = image;
      }
      if (video) {
        event.video = video;
      }

      const updatedEvent = await event.save();

      return res.status(200).json({ message: "Success!", Event: updatedEvent });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get Event -----//
  getEvent: asyncHandler(async (req, res, next) => {
    try {
      const eventId = req.query.eventId;
      const event = await Event.findById(eventId);
      // return res.status(200).json({ event });
      const data = {
        ogTitle: `${event.title}`,
        ogDiscription: `${event.description}`,
        image: "",
        _id: event._id,
        request: "singleEvent",
      };
      if (event.image) {
        // var imge_uri = `${process.env.UPLOAD_BASE_URL}${event.image}`;
        // console.log("imge_uri",imge_uri)
        // console.log("decodeURIComponent(encodeURIComponent(imge_uri))",decodeURIComponent(encodeURIComponent(imge_uri)))
        data.image = event.image;
      }
      res.render("single", { data: data });
    } catch (err) {
      next(err);
    }
  }),
  getSingleEvent: asyncHandler(async (req, res, next) => {
    try {
      const eventId = req.query.eventId;
      const event = await Event.findById(eventId);
      return res.status(200).json({ event });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Events -----//
  getEvents: asyncHandler(async (req, res, next) => {
    try {
      const events = await Event.find({});
      return res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete Event -----//
  deleteEvent: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.body.postId;
      if (!postId) return res.status(400).json({ message: "Provide post id" });
      await Event.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Search Event -----//
  search: asyncHandler(async (req, res, next) => {
    try {
      const title = req.query.title;
      const events = await Event.find({ title: title });
      return res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
