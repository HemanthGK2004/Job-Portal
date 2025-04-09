import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhook = async (req, res) => {
    try{
        //create svix instance with secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whhook.verify(JSON.stringify(req.body),{
            "svix_id": req.headers["svix-id"],
            "svix_timestamp": req.headers["svix-timestamp"],
            "svix_signature": req.headers["svix-signature"]
        })

        // Getting data from request user
        const {data,type} = req.body;
        // Check if the data is a user object
        switch(type){
            case "user.created":{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
            }
            await User.create(userData);
            res.json({})
            break;
        }
        case "user.updated":{
            const userData = {
                email: data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                image: data.image_url,
                resume: ''
                }
                await User.findByIdAndUpdate(data.id,userData);
                res.json({})
                break;
            }
        case "user.deleted":{
            await User.findByIdAndDelete(data.id);
            res.json({})
            break;
        }
        default:
            break;
    }
    }
    catch (error) {
        console.error(error.message);
        res.json({success:false,message:"webhooks error"});
    }
}