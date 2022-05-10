import { Component } from "react";
import "./RowComponent.css"
import UserListContext from '../../Contexts/UserListContext'


class RowComponent extends Component {

    static contextType = UserListContext;

    getValue = (column) => (this.props.UserData[this.context.cols.indexOf(column)]);

    state = {

        edit: false,
        editedName: this.getValue("Name"),
        editedDay: this.getValue("MembershipDate").split("/")[0],
        editedMonth: this.getValue("MembershipDate").split("/")[1],
        editedYear: this.getValue("MembershipDate").split("/")[2],
        editedEmail: this.getValue("Email"),
        editedRole: this.getValue("Role"),
        editedTitle: this.getValue("Title"),
        editedField: this.getValue("Field"),
        editedAge: this.getValue("Age"),
        editedWorkExperience: this.getValue("WorkExperience"),

    }
    
    EditChangeMethod(key){

        let {
            editedName,editedYear,editedMonth,editedDay,editedTitle,
            editedField,editedAge,editedWorkExperience,editedEmail,editedRole
        } = this.state;
        let dataChanged = [
            editedName,(editedDay+"/"+editedMonth+"/"+editedYear),editedTitle,
            editedField,editedAge,editedWorkExperience,editedEmail,editedRole,key
        ]
        
        this.context.EditUser(key,dataChanged);
        this.setState({ edit: false })
    }

 
    setValueInput(name, event) {
        
        this.setState({ [name]: event.target.value })
    }

    EditStateMethod(key){
        
        this.setState({ edit: true })
    }
    render() {

        let {
            edit , editedName,editedDay,editedMonth,editedYear,editedEmail,
            editedRole,editedTitle,editedField,editedAge,editedWorkExperience
        } = this.state;
        let { cols,RemoveUser } = this.context;
        let {UserData } = this.props;
        let key = UserData[cols.indexOf("key")];
        
        return (
            <tr>
               
                {
                    cols.map((element, index) => {

                        if (element === "key") return null;
                        else if(!edit) {
                            if (element === "WorkExperience") {
                                let elem = UserData[cols.indexOf(element)];
                                let txt = elem === "lessoneyear" ? "کمتر ازیک سال" : 
                                    elem === "betweenoneandtwoyear" ? "بین یک تا دو سال" : "بیشتر از دو سال";
                                return <td key={index}>{txt}</td>;

                            } else return <td key={index}>{UserData[cols.indexOf(element)]}</td>;
                        }
                        else {
                            if (element === "Role") {
                                return ( 
                                    <td key={index}>
                                        <select id="user-type" name="user-type" value={editedRole} 
                                            onChange={this.setValueInput.bind(this, "editedRole")} >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </td>
                                )
                            
                            } else if (element === "WorkExperience")
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
                            else if (element === "MembershipDate"){
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
                                
                                    let text = element === "Title" ? "عنوان شغلی" : 
                                        element === "Field" ? "رشته تحصیلی" : element === "Age" ? "سن" : element === "Name" ? "نام" : "ایمیل";
                                    let valueItem = element === "Title" ? editedTitle : 
                                        element === "Field" ? editedField : element === "Age" ? editedAge : element === "Name" ? editedName : editedEmail;

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
                                <button type="button" className="btn btn-sm btn-primary btn-custom" onClick={this.EditChangeMethod.bind(this, key)}>Edit</button> 
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn btn-sm btn-primary btn-custom" onClick={this.EditStateMethod.bind(this, key)}>Edit</button>
                                <button type="button" className="btn btn-sm btn-danger remove btn-custom" onClick={RemoveUser.bind(this, key)}>Remove</button>
                            </>
                        )
                        
                    }
                
                </td>
                     
            </tr>
        )
    }
}

export default RowComponent;