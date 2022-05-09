import { Component } from "react";
import "./RowComponent.css"
import UserListContext from '../../Contexts/UserListContext'


class RowComponent extends Component {

    static contextType = UserListContext;

    getValue = (column) => (this.props.UserData[this.context.cols.indexOf(column)]);

    state = {

        edit: false,
        editedName: this.getValue("name"),
        editedDay: this.getValue("MembershipDate").split("/")[0],
        editedMonth: this.getValue("MembershipDate").split("/")[1],
        editedYear: this.getValue("MembershipDate").split("/")[2],
        editedEmail: this.getValue("Email"),
        editedRole: this.getValue("Role"),
        editedTitle: this.getValue("title"),
        editedField: this.getValue("field"),
        editedAge: this.getValue("age"),
        editedWorkExperience: this.getValue("workExperience"),

    }

    changeValue(){
        
    }
    setValueInput(name, event) {
        
        this.setState({ [name]: event.target.value })
    }
    EditMethod(){
        this.setState({ edit: true })
    }
    render() {

        let {
            edit , editedName,editedDay,editedMonth,editedYear,editedEmail,
            editedRole,editedTitle,editedField,editedAge,editedWorkExperience
        } = this.state;
        let { cols,EditUser,RemoveUser } = this.context;
        let {UserData } = this.props;
        let key = UserData[cols.indexOf("key")];

        return (
            <tr>
               
                {
                    cols.map((element, index) => {

                        if (element == "key") return null;
                        else if(!edit) {
                            if (element == "workExperience") {
                                let elem = UserData[cols.indexOf(element)];
                                let txt = elem == "lessoneyear" ? "کمتر ازیک سال" : 
                                    elem == "betweenoneandtwoyear" ? "بین یک تا دو سال" : "بیشتر از دو سال";
                                return <td key={index}>{txt}</td>;

                            } else return <td key={index}>{UserData[cols.indexOf(element)]}</td>;
                        }
                        else {
                            if (element == "Role") {
                                return ( 
                                    <td key={index}>
                                        <select id="user-type" name="user-type" value={editedRole} 
                                            onChange={this.setValueInput.bind(this, "editedRole")} >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </td>
                                )
                            
                            } else if (element == "workExperience")
                                return (
                                    <td key={index}>
                                        <select id="workExperience" name="workExperience" value={editedWorkExperience}
                                            onChange={this.setValueInput.bind(this, "editedWorkExperience")} >
                                            <option value="lessoneyear">کمتر ازیک سال</option>
                                            <option value="betweenoneandtwoyear">بین یک تا دو سال</option>
                                            <option value="moretwoyear">بیشتر از دو سال</option>
                                        </select>
                                    </td>
                                )
                            else if (element == "MembershipDate"){
                                return (
                                    <td key={index} className="membership-date">
                                        <input  type="text" id={"day"} name={"day"}
                                            placeholder={"روز"}  value={editedDay}
                                            onChange={
                                                this.setValueInput.bind(
                                                    this, ("editedDay")
                                                )}
                                        />
                                        /
                                        <input  type="text" id={"month"} name={"month"}
                                            placeholder={"ماه"}  value={editedMonth}
                                            onChange={
                                                this.setValueInput.bind(
                                                    this, ("editedMonth")
                                                    )} 
                                        />
                                        /
                                        <input  type="text" id={"year"} name={"year"}
                                            placeholder={"سال"}  value={editedYear}
                                            onChange={
                                                this.setValueInput.bind(
                                                    this, ("editedYear")
                                                )} 
                                        />
                                    </td>
                                    )
                                }
                            else {
                                
                                    let text = element == "title" ? "عنوان شغلی" : 
                                        element == "field" ? "رشته تحصیلی" : element == "age" ? "سن" : "ایمیل";
                                    let valueItem = element == "title" ? editedTitle : 
                                        element == "field" ? editedField : element == "age" ? editedAge : element == "name" ? editedName : editedEmail;

                                        return(<td key={index}>
                                    {
                                    
                                        <input  type="text" id={element} name={element}
                                            placeholder={text}  value={valueItem}
                                             onChange={
                                                this.setValueInput.bind(
                                                     this, ("edited"+element.charAt(0).toUpperCase() + element.slice(1))
                                                )} 
                                        />
                                    
                                    }
                                </td>)
                            }
                            
                        }

                    })
                }
                <td>
                    {
                       
                        edit ? (
                            <>
                                <button type="button" className="btn btn-sm btn-danger" onClick={EditUser.bind(this, key)}>Edit</button> 
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn btn-sm btn-danger" onClick={this.EditMethod.bind(this, key)}>Edit</button>
                                <button type="button" className="btn btn-sm btn-danger remove" onClick={RemoveUser.bind(this, key)}>Remove</button>
                            </>
                        )
                        
                    }
                
                </td>
                     
            </tr>
        )
    }
}

export default RowComponent;