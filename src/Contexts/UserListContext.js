import React from "react";

const UserListContext = React.createContext({

    Users: [],
    ShowForm: true,
    AddUser: ()=>{},
    EditUser: ()=>{},
    RemoveUser:  ()=>{},
    ShowFormMethod:  ()=>{},
});

export default UserListContext;

