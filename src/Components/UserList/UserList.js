import { Component } from "react";
import "./UserList.css"
import TableComponent from '../TableComponent/TableComponent'
import UserListContext from '../../Contexts/UserListContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModlalComponent from '../ModlalComponent/ModlalComponent'

class UserList extends Component {

    state = {
        User : Object.entries(localStorage).map(([key, value]) => value.split(",")),
        ShowForm: false
    }

    cols = ["Name", "MembershipDate","Title","Field","Age","WorkExperience","Email","Role","key"]

    AddUser([key, array]) {
        
        localStorage.setItem(key, array);
        this.setState(prevState => ({ User: [...prevState.User, array],ShowForm: false }));
    }

    ShowFormMethod(show){
        this.setState({ShowForm: show})
    }



    EditUser(key, array){

        localStorage.setItem(key, array);
        let users = this.state.User.map((item,index) => {
            if (item[this.cols.indexOf("key")] === key) item = array;
            return item;
        });

        this.setState(prevState => ({ 
            User: [...users]
           
        }))
    }

    RemoveUser(key){
        localStorage.removeItem(key);
        this.setState(prevState => ({ User: [...prevState.User.filter(item => (item[this.cols.indexOf("key")] !== key))] }));
    }

    render() {

        let {User,ShowForm} = this.state;
        
        return (
          <UserListContext.Provider value={{
                cols: this.cols,
                User: User,
                ShowForm: ShowForm,
                AddUser: this.AddUser.bind(this),
                EditUser: this.EditUser.bind(this),
                RemoveUser: this.RemoveUser.bind(this),
                ShowFormMethod: this.ShowFormMethod.bind(this),
            }}>
            <div>
            <div className="add-user">
                <button type="button" className="btn btn-sm btn-primary" onClick={this.ShowFormMethod.bind(this,true)}>Add User</button>
            </div>

            <div>
                <TableComponent/>
            </div>
            <div>
                <ModlalComponent ShowForm={ShowForm}/>                
            </div>
            </div>
            </UserListContext.Provider>
        )
    }
}

export default UserList;