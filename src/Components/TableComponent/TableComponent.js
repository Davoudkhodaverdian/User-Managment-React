import { Component } from "react";
import "./TableComponent.css"

class TableComponent extends Component {


    render() {

       
    
        return (
            <div className="table">
                <div className="table-part">

                    <table className="content-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>توضیحات</th>
                                <th>نوع هزینه</th>
                                <th>تاریخ</th>
                                <th>مبلغ</th>
                                <th>ردیف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {"سقغطیغی"}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableComponent;