import * as actions from "./actionTypes";
import { getAxiosInstance } from "./axios";

const initialState = { rows: [] };

export default function reduceRight(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DATA:
            return { ...state, rows: action.payload.rows }
    }
}
