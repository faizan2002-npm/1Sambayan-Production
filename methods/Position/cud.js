const asyncHandler = require("../../middlewares/async");
const Position = require("../../models/Position/Position");
const User = require("../../models/User/User");

const methods = {
    //----- Create Community -----//
    create: asyncHandler(async (req, res, next) => {
        try {
            const { name, description } = req.body;

            const ownerId = req.user._id;
            // Saving Channel in DataBase
            const position = await Position.create({
                name,
                description,
                owner: ownerId,
            });

            return res.status(200).json({ position });
        } catch (err) {
            next(err);
        }
    }),

    //----- Update Community -----//
    update: asyncHandler(async (req, res, next) => {
        try {
            const { name, description, positionId } = req.body;
            let position = await Position.findById(positionId);
            if (name) {
                position.name = name;
            }
            if (description) {
                position.description = description;
            }

            const updatedPosition = await position.save();

            return res
                .status(200)
                .json({ message: "Success!", Position: updatedPosition });
        } catch (err) {
            next(err);
        }
    }),

    //----- Delete channel -----//
    deletePosition: asyncHandler(async (req, res, next) => {
        try {
            const positionId = req.body.positionId;
            if (!positionId)
                return res.status(400).json({ message: "Provide Poll id" });
            await Position.findByIdAndDelete(positionId);
            return res.status(200).json({ message: "Successfully Deleted!" });
        } catch (err) {
            next(err);
        }
    }),

    //----- Get channel -----//
    getPosition: asyncHandler(async (req, res, next) => {
        try {
            const positionId = req.query.positionId;
            const position = await Position.findById(positionId);
            return res.status(200).json({ position });
        } catch (err) {
            next(err);
        }
    }),

    //----- Get list of Channels -----//
    getPositions: asyncHandler(async (req, res, next) => {
        try {
            const positions = await Position.find({});
            return res.status(200).json({ positions });
        } catch (err) {
            next(err);
        }
    }),

    //----- Join Channel -----//
    applyPosition: asyncHandler(async (req, res, next) => {
        try {
            const positionId = req.query.positionId;
            const userId = req.query.userId;
            const member = { userId };
            let position = await Position.findById(positionId);
            const isMember = await Position.findOne({
                _id: positionId,
                members: { $elemMatch: { userId: userId } },
            });
            if (isMember) {
                return res
                    .status(400)
                    .json({ message: "You have already Applied for this position" });
            }
            position.members.push(member);
            await position.save();
            return res.status(200).json({ position });
        } catch (err) {
            next(err);
        }
    }),
};

module.exports = methods;
