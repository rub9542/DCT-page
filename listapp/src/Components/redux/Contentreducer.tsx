
import { ActionTypes } from "./actions";
interface ItemsState {
  items: any[];
}

const initialState: ItemsState = {
  items: [],
};

const ContentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      let data1 = state.items;
      data1 = [...data1, ...action.data];
      return {
        ...state,
        items: [...data1],
      };
    case ActionTypes.UPDATE_ITEM:
      let data2 = state.items;
      let id = action.data[0].id || "";
      let info = action.data[0].name || "";
      data2.map((a, i) => {
        if (a.id === id) {
          data2[i].name = info;
        }
      });
      return {
        ...state,
        items: [...data2],
      };
    case ActionTypes.CHECK_ITEM:
      let data4 = state.items;
      let itemToMove = data4.filter((item) => item.id === action.data)[0];
      itemToMove.complete = !itemToMove.complete;
      const newArray = data4.filter((item) => item.id !== action.data); // Exclude the item to move
      if (itemToMove.complete) {
        newArray.push(itemToMove);
      } else {
        newArray.unshift(itemToMove);
      }
      return {
        ...state,
        items: [...newArray],
      };
    case ActionTypes.DELETE_ITEM:
      let data3 = state.items;
      data3 = data3.filter((a) => a.id !== action.data);
      return {
        ...state,
        items: [...data3],
      };
    default:
      return state;
  }
};
export default ContentReducer;
