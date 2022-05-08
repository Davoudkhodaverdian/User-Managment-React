import React from "react";

const UserListContext = React.createContext({
  
    cols: [],
    Users: [],
    AddUser: ()=>{},
    EditUser: ()=>{},
    RemoveUser:  ()=>{},
});

export default UserListContext;

