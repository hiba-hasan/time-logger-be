import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Activity must belong to a user"],
  },
  activityName: {
    type: String,
    required: [true, "Please provide an activity name"],
    trim: true,
  },
  minutes: {
    type: Number,
    required: [true, "Please provide minutes spent"],
    min: [1, "Minutes must be at least 1"],
    max: [1440, "Minutes cannot exceed 1440 (24hrs)"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ["work", "study", "fitness", "personal", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.index({ user: 1, date: 1 });

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
