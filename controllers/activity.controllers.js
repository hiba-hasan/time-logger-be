import Activity from "../models/activity.models.js";

//create activity:/api/activity/create
export const addActivity = async (req, res) => {
  try {
    const { activityName, minutes, date, category } = req.body;

    const activity = await Activity.create({
      user: req.user._id,
      activityName,
      minutes,
      date: date || new Date(),
      category,
    });

    res.status(201).json(activity);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to add activity" });
  }
};

//deleting a particular activity:/api/activity/delete/:id
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity || activity.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await Activity.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete activity" });
  }
};
//getAllThe Activities of the curremt loggedin user: /api/user/getAllActivities
export const getActivities = async (req, res) => {
  try {
    let query = { user: req.user._id };
    if (req.query.date) {
      query.date = new Date(req.query.date);
    }

    const activities = await Activity.find(query).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};

//activity summary like total time spent for each activity on a particular day and also the total time spent doin activities on that day
//  /api/activity/getActivitySummary
export const getActivitySummary = async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const activities = await Activity.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$activityName",
          totalMinutes: { $sum: "$minutes" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          activities: {
            $push: {
              activityName: "$_id",
              totalMinutes: "$totalMinutes",
              count: "$count",
            },
          },
          totalTimeSpent: { $sum: "$totalMinutes" },
        },
      },
      {
        $project: {
          _id: 0,
          activities: 1,
          totalTimeSpent: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: start } },
        },
      },
    ]);

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};

//fetch all logged entries for all dates : for adminn

export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ date: -1 })
      .populate("user", "username email");

    res.json({ count: activities.length, activities });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all activities" });
  }
};

/*Display log entries for a specific date
Fetch logs based on a given date.
Return activity names and time durations for that day.
*/

//for any user, we display the activities on a specific date
//if its the admin , then v have to display all logs on that specific dat...

//display all the activities on a specific date for a specific user:

//YET T0 IMPLEMENT:
/*
 * Admin login and admin able to fetch all the logs
 * Delete a particular log
 */
