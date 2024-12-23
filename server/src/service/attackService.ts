import { AttackModel } from "../models/attackModle";

import { createAttack } from "./createattackService";
export const get_search_keywords = async (query: string) => {
    try {
        const attacks = await AttackModel.find({ $text: { $search: query } });
        return attacks
    }
    catch (err) {
        console.log('inside the get search kewwords', err)
    }
}
