import { Webhook } from "svix";
import User from "../models/User.js";

// ✅ FIXED FUNCTION NAME & EXPORT
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ FIXED HEADER NAME "svix-timestap" -> "svix-timestamp"
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id, // ✅ FIXED: should be data.id not data._id
          email: data.email_addresses[0].email_address, // ✅ FIXED: typo (email_address → email_addresses)
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        // ✅ FIXED: typo (findByUpdate -> findByIdAndUpdate) and fixed variable case
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        // res.status(400).json({ message: "Unhandled event type" });
        break;
    }
  } catch (error) {
    // ✅ FIXED: typo (res.jsos -> res.json)
    res.json({ success: false, message: error.message });
  }
};
