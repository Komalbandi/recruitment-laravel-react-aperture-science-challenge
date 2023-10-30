import { Paginiation } from "../interfaces/pagination";
import { Reducer } from "react";

type actionType = {
  type: string;
  payload: Paginiation;
};

export function paginationReducer(state: any, action: actionType) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        current_page: action.payload.current_page,
        first_page_url: action.payload.first_page_url,
        from: action.payload.from,
        last_page: action.payload.last_page,
        last_page_url: action.payload.last_page_url,
        next_page_url: action.payload.next_page_url,
        path: action.payload.path,
        per_page: action.payload.per_page,
        prev_page_url: action.payload.prev_page_url,
        to: action.payload.to,
        total: action.payload.total,
      };
    default:
      throw Error("Unknown action.");
  }
}
