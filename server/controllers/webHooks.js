import { Webhook } from "svix";
import User from "../models/User.js";

// API controller to handle Clerk webhooks
export const clerkWebhook = async (req, res) => {
    try {
        // Create a Svix instance with Clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook
        const evt = webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // Get the event type and data
        const { data, type } = evt;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id, // ⚠️ not `__id` — use `_id` to match MongoDB schema
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0]?.email_address || '',
                    image: data.profile_image_url || '',
                    resume: ''
                };
                await User.create(userData);
                return res.status(201).json({ message: "User created" });
            }

            case "user.updated": {
                const updateData = {
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0]?.email_address || '',
                    image: data.profile_image_url || ''
                };
                await User.findByIdAndUpdate(data.id, updateData, { new: true });
                return res.status(200).json({ message: "User updated" });
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ message: "User deleted" });
            }

            default:
                return res.status(200).json({ message: "Event ignored" });
        }

    } catch (error) {
        console.error("Error in webhook:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
