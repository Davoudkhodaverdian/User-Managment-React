import { Component } from "react";
import "./UserList.css"
import TableComponent from '../TableComponent/TableComponent'

class UserList extends Component {

    


    AddUser() {

    } 


    render() {

        return (
            <div>
            <div className="add-user">  
                <button type="button" className="btn btn-sm btn-danger" onClick={this.AddUser}>Add User</button>
            </div>

            <div>
                <TableComponent/>
            </div>
            </div>
        )
    }
}

export default UserList;