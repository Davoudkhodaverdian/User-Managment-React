import { Component } from "react";
import "./UserList.css"
import TableComponent from '../TableComponent/TableComponent'
import UserListContext from '../../Contexts/UserListContext'
class UserList extends Component {

    state = {
        User : Object.entries(localStorage).map(([key, value]) => value.split(","))
    }

    
    cols = ["Name", "MembershipTime","Email","Role","key"]

    AddUser() {
        alert("AddUser")
    } 

    EditUser(){
        alert("EditUser")
    }

    RemoveUser(){
        alert("RemoveUser")
    }

    render() {

        let {User} = this.state;
        return (
          <UserListContext.Provider value={{
                cols: this.cols,
                User: User,
                AddUser: this.AddUser.bind(this),
                EditUser: this.EditUser.bind(this),
                RemoveUser: this.RemoveUser.bind(this),
            }}>
            <div>
            <div className="add-user">
                <button type="button" className="btn btn-sm btn-danger" onClick={this.AddUser}>Add User</button>
            </div>

            <div>
                <TableComponent/>
            </div>
            </div>
            </UserListContext.Provider>
        )
    }
}

export default UserList;