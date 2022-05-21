import { Component } from "react";
import "./TableComponent.css";
import RowComponent from "../RowComponent/RowComponent";
import UserListContext from "../../Contexts/UserListContext"
import { useContext, useState} from 'react'

function TableComponent () {
    
    const userListContext = useContext(UserListContext);

  
        
        let {User} = userListContext;
        return (
            <div className="table">
                <div className="table-part">

                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>نام کاربر</th>
                                <th>ناریخ عضویت</th>
                                <th>عنوان شغلی</th>
                                <th>رشته تحصیلی</th>
                                <th>سن</th>
                                <th>تجربه کاری</th>
                                <th>ایمیل</th>
                                <th>نقش</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {User.map((item, index) => (<RowComponent key={item.key} UserData={item} />))}
                        </tbody>
                    </table>
                    {User.length === 0 ? <p className="no-user">there is no user</p> : null}
                </div>
            </div>
        )
  
}

export default TableComponent;