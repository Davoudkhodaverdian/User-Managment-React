import "./UserList.css"
import TableComponent from '../TableComponent/TableComponent'
import UserListContext from '../../Contexts/UserListContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModlalComponent from '../ModlalComponent/ModlalComponent'
import { useContext, useState } from 'react'


function UserList() {


    const [state, setState] = useState({
        User: JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [],
        ShowForm: false
    });

  

    const AddUser = (data) => {

        setState(prevState => {
            let users = [...prevState.User, data]
            localStorage.setItem('users',JSON.stringify(users));
            return { User: users, ShowForm: false };
        })
    }

    const ShowFormMethod = (show) => {
        setState(prevState => ({ ...prevState, ShowForm: show }));

    }

    const EditUser = (data) => {

        setState(prevState => {

            let users = state.User.map(item => {
                if (item.key === data.key) item = data;
                return item;
            });

            localStorage.setItem('users',JSON.stringify(users));
           return { ...prevState, User: users }
        });
    }

    const RemoveUser = (key) => {
   
        setState(prevState => {

            let users = [...prevState.User.filter(item => item.key !== key)]
            localStorage.setItem('users',JSON.stringify(users));
           return { ...prevState, User: users }
        });
    }

    let { User, ShowForm } = state;

    return (
        <UserListContext.Provider value={{
            User: User,
            ShowForm: ShowForm,
            AddUser: AddUser,
            EditUser: EditUser,
            RemoveUser: RemoveUser,
            ShowFormMethod: ShowFormMethod,
        }}>
            <div>
                <div className="add-user">
                    <button type="button" className="btn btn-sm btn-primary" onClick={ShowFormMethod.bind(this, true)}>Add User</button>
                </div>

                <div>
                    <TableComponent />
                </div>
                <div>
                    <ModlalComponent ShowForm={ShowForm} />
                </div>
            </div>
        </UserListContext.Provider>
    )

}

export default UserList;