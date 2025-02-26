import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
    {
        title: {type: "string", required: true},
        desc: {type: "string", required: true},
        price: {type: "string", required: true},
        user: {type: Schema.Types.ObjectId, ref:"User"},
    },
    {
        timestamps: true,
    }
)

const Service = models.Service || model("Service", ServiceSchema);

export default Service;