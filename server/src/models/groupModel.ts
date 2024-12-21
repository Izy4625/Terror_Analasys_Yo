import { Schema,model } from "mongoose";
import { group } from "../types/group";

export const groupSchema = new Schema<group>({
    gname: {type: String, unique: true},
    aincidents: {type: Number},
    nkill: {type: Number},
    nwound: {type: Number}

})

export const GroupModel = model('Groups', groupSchema)