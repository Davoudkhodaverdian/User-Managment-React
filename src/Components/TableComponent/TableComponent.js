import { Component } from "react";
import "./TableComponent.css";
import RowComponent from "../RowComponent/RowComponent";
import UserListContext from "../../Contexts/UserListContext"

class TableComponent extends Component {
    
    static contextType = UserListContext;

    render() {
        
        let {User,cols} = this.context;
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
                            {User.map((item, index) => (<RowComponent key={item[cols.indexOf("key")]} UserData={item} />))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableComponent;