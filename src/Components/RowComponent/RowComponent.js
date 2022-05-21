import { Component } from "react";
import "./RowComponent.css"
import UserListContext from '../../Contexts/UserListContext'
import React, { useContext, useState } from 'react'

function RowComponent(props) {


    const userListContext = useContext(UserListContext);

    let { UserData } = props;

    const [state, setState] = useState({

        edit: false,
        editedName: UserData.name,
        editedDay: props.UserData.membershipDate.split("/")[2],
        editedMonth: props.UserData.membershipDate.split("/")[1],
        editedYear: props.UserData.membershipDate.split("/")[0],
        editedEmail: props.UserData.email,
        editedRole: props.UserData.role,
        editedTitle: props.UserData.title,
        editedField: props.UserData.field,
        editedAge: props.UserData.age,
        editedWorkExperience: props.UserData.workExperience,
    });


    const EditChangeMethod = (id,key) => {

        let {
            editedName, editedYear, editedMonth, editedDay, editedTitle,
            editedField, editedAge, editedWorkExperience, editedEmail, editedRole
        } = state;
        let dataChanged = {
            name: editedName, membershipDate: (Number(editedYear) + "/" + Number(editedMonth) + "/" + Number(editedDay)), title: editedTitle,
            field: editedField, age: editedAge, workExperience: editedWorkExperience, email: editedEmail, role: editedRole, password: key
        }

        userListContext.EditUser({...dataChanged},id);
        setState(prevState => ({ ...prevState, edit: false }))
    }


    const setValueInput = (name, event) => {
        
        setState(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    const EditStateMethod = (key) => {

        setState(prevState => ({ ...prevState, edit: true }))

    }


    let {
        edit, editedName, editedDay, editedMonth, editedYear, editedEmail,
        editedRole, editedTitle, editedField, editedAge, editedWorkExperience
    } = state;

    let { RemoveUser } = userListContext;
    
    let key = UserData.password;
    let id = UserData.id
    return (
        <tr>

            {

                Object.keys(UserData).map((element, index) => {

                    if (element === "password" || element === "id") return null;
                    else if (!edit) {
                        if (element === "workExperience") {
                            let elem = UserData[element];
                            let txt = elem === "lessoneyear" ? "کمتر ازیک سال" :
                                elem === "betweenoneandtwoyear" ? "بین یک تا دو سال" : "بیشتر از دو سال";
                            return <td key={index}>{txt}</td>;

                        } else return <td key={index}>{UserData[element]}</td>;
                    }
                    else {
                        if (element === "role") {
                            return (
                                <td key={index}>
                                    <select id="user-type" name="user-type" value={editedRole}
                                        onChange={setValueInput.bind(this, "editedRole")} >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                            )

                        } else if (element === "workExperience") {
                            return (
                                <td key={index}>
                                    <select id="workExperience" name="workExperience" value={editedWorkExperience}
                                        onChange={setValueInput.bind(this, "editedWorkExperience")} >
                                        <option value="lessoneyear">کمتر ازیک سال</option>
                                        <option value="betweenoneandtwoyear">بین یک تا دو سال</option>
                                        <option value="moretwoyear">بیشتر از دو سال</option>
                                    </select>
                                </td>
                            )
                        } else if (element === "membershipDate") {
                            return (
                                <td key={index} className="membership-date">
                                    <input type="text" id={"year"} name={"year"}
                                        placeholder={"سال"} value={editedYear}
                                        onChange={setValueInput.bind(this, "editedYear")}
                                    />
                                    /
                                    <input type="text" id={"month"} name={"month"}
                                        placeholder={"ماه"} value={editedMonth}
                                        onChange={setValueInput.bind(this, "editedMonth")}
                                    />
                                    /
                                    <input type="text" id={"day"} name={"day"}
                                        placeholder={"روز"} value={editedDay}
                                        onChange={setValueInput.bind(this, "editedDay")}
                                    />
                                </td>
                            )
                        } else {

                            let text = element === "title" ? "عنوان شغلی" :
                                element === "field" ? "رشته تحصیلی" : element === "age" ? "سن" : element === "name" ? "نام" : "ایمیل";
                            let valueItem = element === "title" ? editedTitle :
                                element === "field" ? editedField : element === "age" ? editedAge : element === "name" ? editedName : editedEmail;

                            return (
                                <td key={index}>
                                    {
                                        <input type="text" id={element} name={element}
                                            placeholder={text} value={valueItem}
                                            onChange={
                                                setValueInput.bind(
                                                    this, ("edited" + element.charAt(0).toUpperCase() + element.slice(1))
                                                )}
                                        />
                                    }
                                </td>
                            )
                        }

                    }

                })
            }
            <td>
                {

                    edit ? (
                        <>
                            <button type="button" className="btn btn-sm btn-primary btn-custom" onClick={EditChangeMethod.bind(this, id,key)}>Edit</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn btn-sm btn-primary btn-custom" onClick={EditStateMethod.bind(this, key)}>Edit</button>
                            <button type="button" className="btn btn-sm btn-danger remove btn-custom" onClick={RemoveUser.bind(this, id,key)}>Remove</button>
                        </>
                    )

                }

            </td>

        </tr>
    )

}

export default RowComponent;