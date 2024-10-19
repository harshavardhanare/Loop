import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select(
      "connections skills experience education"
    );

    // Ensure connections are in ObjectId format
    const userConnections = currentUser.connections.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const userSkills = currentUser.skills || [];
    const userCompanies = currentUser.experience.map((exp) =>
      exp.company.toLowerCase()
    );
    const userSchools = currentUser.education.map((edu) =>
      edu.school.toLowerCase()
    );

    const suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(req.user._id),
            $nin: userConnections, // Ensure connections are properly excluded
          },
        },
      },
      {
        $addFields: {
          skillMatch: { $size: { $setIntersection: ["$skills", userSkills] } },
          companyMatch: {
            $size: {
              $setIntersection: [
                {
                  $map: {
                    input: "$experience",
                    as: "exp",
                    in: { $toLower: "$$exp.company" },
                  },
                },
                userCompanies,
              ],
            },
          },
          schoolMatch: {
            $size: {
              $setIntersection: [
                {
                  $map: {
                    input: "$education",
                    as: "edu",
                    in: { $toLower: "$$edu.school" },
                  },
                },
                userSchools,
              ],
            },
          },
        },
      },
      {
        $addFields: {
          totalMatch: {
            $add: ["$skillMatch", "$companyMatch", "$schoolMatch"],
          },
        },
      },
      {
        $sort: { totalMatch: -1 }, // Sort by match strength
      },
      {
        $project: {
          name: 1,
          username: 1,
          profilePicture: 1,
          headline: 1,
          skillMatch: 1,
          companyMatch: 1,
          schoolMatch: 1,
          skills: 1, // Include skills
          experience: 1, // Include experience
          education: 1, // Include education
        },
      },
    ]);

    // If no matches found, find random users excluding already connected and suggested users
    const randomUser = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(req.user._id),
            $nin: [
              ...userConnections,
              ...suggestedUsers.map((user) => user._id),
            ],
          },
        },
      },
      { $sample: { size: 1 } },
      {
        $project: {
          name: 1,
          username: 1,
          profilePicture: 1,
          headline: 1,
          skillMatch: { $literal: 0 },
          companyMatch: { $literal: 0 },
          schoolMatch: { $literal: 0 },
          totalMatch: { $literal: 0 },
          skills: 1, // Include skills
          experience: 1, // Include experience
          education: 1, // Include education
        },
      },
    ]);

    const allSuggestedUsers = [...suggestedUsers, ...randomUser];

    const suggestedUsersWithReason = allSuggestedUsers.map((user) => {
      if (user.totalMatch > 0) {
        let reasons = [];
        if (user.skillMatch > 0) reasons.push("similar skills");
        if (user.companyMatch > 0) reasons.push("shared work experience");
        if (user.schoolMatch > 0) reasons.push("educational background");
        return {
          ...user,
          reason:` Suggested based on ${reasons.join(", ")}`,
        };
      } else {
        return {
          ...user,
          reason: "Suggested to help you expand your network",
        };
      }
    });

    console.log("suggestedUsersWithReason", suggestedUsersWithReason);
    res.json(suggestedUsersWithReason);
  } catch (error) {
    console.error("Error in getSuggestedConnections controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicProfile = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.error("Error in getPublicProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const allowedFields = [
			"name",
			"username",
			"headline",
			"about",
			"location",
			"profilePicture",
			"bannerImg",
			"skills",
			"experience",
			"education",
		];

		const updatedData = {};

		for (const field of allowedFields) {
			if (req.body[field]) {
				updatedData[field] = req.body[field];
			}
		}

		if (req.body.profilePicture) {
			const result = await cloudinary.uploader.upload(req.body.profilePicture);
			updatedData.profilePicture = result.secure_url;
		}

		if (req.body.bannerImg) {
			const result = await cloudinary.uploader.upload(req.body.bannerImg);
			updatedData.bannerImg = result.secure_url;
		}

		const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(
			"-password"
		);

		res.json(user);
	} catch (error) {
		console.error("Error in updateProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
