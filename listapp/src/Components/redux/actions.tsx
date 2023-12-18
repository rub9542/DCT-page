
export enum ActionTypes {
ADD_ITEM = "ADD_ITEM",
UPDATE_ITEM = "UPDATE_ITEM",
DELETE_ITEM = "DELETE_ITEM",
CHECK_ITEM = "CHECK_ITEM",
}

export const addItem = (data:any[]) => {
  return {
    type: ActionTypes.ADD_ITEM,
    data,
  };
};
export const checkItem = (data:string) => ({
 
    type: ActionTypes.CHECK_ITEM,
    data,
});
export const updateItem = (data: any[]) => ({

    type: ActionTypes.UPDATE_ITEM,
    data,

});

export const deleteItem = (data:string) => {
  return {
    type: ActionTypes.DELETE_ITEM,
    data,
  };
};

