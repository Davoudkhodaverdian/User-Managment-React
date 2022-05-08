import { Component } from "react";
import "./RowComponent.css"
import UserListContext from '../../Contexts/UserListContext'


class RowComponent extends Component {

    static contextType = UserListContext;

    render() {

      
        let { cols,EditUser,RemoveUser } = this.context;
        let {UserData } = this.props;
        let key = UserData[cols.indexOf("key")];
debugger
        return (
            <tr>
               
                {
                    cols.map((element, index) => {

                       
                        if (element == "key") return null;
                        else return <td key={index}>{UserData[cols.indexOf(element)]}</td>;
                    })
                }
                <td>
                <button type="button" className="btn btn-sm btn-danger" onClick={EditUser.bind(this, key)}>Edit</button>
                    <button type="button" className="btn btn-sm btn-danger remove" onClick={RemoveUser.bind(this, key)}>Remove</button>
                </td>
                     
            </tr>
        )
    }
}

export default RowComponent;