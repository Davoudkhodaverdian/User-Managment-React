import "./UserList.css"
import TableComponent from '../TableComponent/TableComponent'
import UserListContext from '../../Contexts/UserListContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModlalComponent from '../ModlalComponent/ModlalComponent'
import { useState } from 'react'
import axios from "../../Api/Api";
import { useEffect } from "react";

function UserList() {


    const [state, setState] = useState({
        User: [],
        ShowForm: false
    });

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get(``)
        .then((response) => {
            // handle success
            if (response.data) setState({ User: Object.entries(response.data.data).map(([key, value]) => { return { ...value } }) })
            console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            // always executed
        });
      },[]);

    const AddUser = (data) => {

        axios.post(``, data)
            .then((response) => {
                // handle success 
                setState(prevState => {
                    let users = [...prevState.User, data]
                    //localStorage.setItem('users',JSON.stringify(users));
                    return { User: users, ShowForm: false };
                })
                //console.log(response);
            }).catch(function (error) {
                // handle error
                console.log(error);
            }).finally(function () {
                // always executed
            });
    }

    const ShowFormMethod = (show) => {
        setState(prevState => ({ ...prevState, ShowForm: show }));
    }

    const EditUser = (data,id) => {

        axios.put(`/${id}`,{...data })
        .then((response) => {
            // handle success

            setState(prevState => {

                let users = state.User.map(item => {
                    if (item.password === data.password) item = {...data,id};
                    return item;
                });
    
               //localStorage.setItem('users',JSON.stringify(users));
               return { ...prevState, User: users }
            });
            
            console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            // always executed
        });

    }

    const RemoveUser = (id,key) => {

        axios.delete(`/${id}`)
        .then((response) => {
            // handle success 
            setState(prevState => {

                let users = [...prevState.User.filter(item => item.password !== key)]
                //localStorage.setItem('users',JSON.stringify(users));
               return { ...prevState, User: users }
            });
            //console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            // always executed
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