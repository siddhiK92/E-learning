import { Webhook } from "svix";
import User from "../models/User.js";
import { response } from "express";

//API controller function to manage clerk user with database

const clerkWebhooks =async(req, res)=>{
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers["svix-timestap"],
            "svix-signature": req.headers['svix.signature']
        })

        const {data, type} = req.body

        switch(type){
            case 'user.created': {
                const userdata ={
                    _id: data._id,
                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userdata)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userdata ={
                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted' : {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;

        }

    }catch(error){
        res.jsos({success: false, message: error.message})

    }
}