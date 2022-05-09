import React from "react";

const UserListContext = React.createContext({
  
    cols: [],
    Users: [],
    ShowForm: true,
    AddUser: ()=>{},
    EditUser: ()=>{},
    RemoveUser:  ()=>{},
    ShowFormMethod:  ()=>{},
});

export default UserListContext;

