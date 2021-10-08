const mongoose = require("mongoose");

//----- Site Page SCHEMA -----//
const SitePageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  sections: [
    {
      heading: {
        type: String,
        required: false,
      },
      button: {
        type: String,
        required: false,
      },
      sectionContentBox: {
        type: String,
        required: false,
      },
    },
  ],
  contentBox: {
    type: String,
    required: false,
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sites",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SitePage", SitePageSchema);
