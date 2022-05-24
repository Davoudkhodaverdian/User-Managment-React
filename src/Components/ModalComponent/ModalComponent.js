import "./ModalComponent.css";
import { Button, Modal } from 'react-bootstrap';
import UserListContext from "../../Contexts/UserListContext"
import { useContext, useState } from 'react'



function ModalComponent(props) {

    const userListContext = useContext(UserListContext)

    const [state, setState] = useState({
        name: "",
        day: "",
        month: "",
        year: "",
        email: "",
        role: "user",
        title: "",
        field: "",
        age: "",
        workExperience: "lessoneyear"
    });

    const handleClose = (show) => { userListContext.ShowFormMethod(show) };

    const setValueInput = (name, event) => {
        setState(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    const submit = (event) => {

        event.preventDefault();
        let { day, month, year, name, email, role, title, field, age, workExperience } = state;

        if (!isNaN(Number(name)) || name === "")
            return alert("نام را به درستی وارد کنید");
        else if (isNaN(Number(day)) || Number(day) === 0 || Number(day) > 31)
            return alert("روز را به درستی وارد کنید");
        else if (isNaN(Number(month)) || Number(month) === 0 || Number(month) > 12)
            return alert("ماه را به درستی وارد کنید");
        else if (isNaN(Number(year)) || Number(year) === 0)
            return alert("سال را به درستی وارد کنید");
        else if (title == "")
            return alert("عنوان شغلی را به درستی وارد کنید");
        else if (field == "")
            return alert("رشته تحصیلی را به درستی وارد کنید");
        else if (isNaN(Number(age)) || age === "")
            return alert("سن را به درستی وارد کنید");
        let key = Date.now();
        setState(prevState => ({
            name: "",
            day: "",
            month: "",
            year: "",
            email: "",
            role: "user",
            title: "",
            field: "",
            age: "",
            workExperience: "lessoneyear"
        }));
        userListContext.AddUser({ name, membershipDate: (Number(year) + "/" + Number(month) + "/" + Number(day)), title, field, age, workExperience, email, role, password: key.toString() });

    }

    let { ShowForm } = props;
    let { day, month, year, name, email, Role, title, field, age, workExperience } = state;


    return (
        <>
            <Modal show={ShowForm} onHide={handleClose.bind(this, false, userListContext)}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <form>
                        <div>
                            <input type="text" id="name" name="name" className="input-custom"
                                value={name} placeholder="نام و نام خانوادگی" onChange={setValueInput.bind(this, "name")} />
                            <label htmlFor="name">نام</label>
                        </div>
                        <div className="date-input">

                            <input type="text" id="year" name="date" className="input-custom"
                                value={year} placeholder="سال" onChange={setValueInput.bind(this, "year")} />

                            <input type="text" id="month" name="date" className="input-custom"
                                value={month} placeholder="ماه" onChange={setValueInput.bind(this, "month")} />

                            <input type="text" id="day" name="date" className="input-custom"
                                value={day} placeholder="روز" onChange={setValueInput.bind(this, "day")} />

                            <label htmlFor="date">تاریخ</label>
                        </div>
                        <div>
                            {

                                ["title", "field", "age", "email"].map((item, index) => {
                                    let text = item == "title" ? "عنوان شغلی" :
                                        item == "field" ? "رشته تحصیلی" : item == "age" ? "سن" : "ایمیل";
                                    let valueItem = item == "title" ? title :
                                        item == "field" ? field : item == "age" ? age : email;
                                    return (
                                        <div key={index}>
                                            <input type={item} id={item} name={item} className="input-custom"
                                                placeholder={text} value={valueItem} onChange={setValueInput.bind(this, item)} />
                                            <label htmlFor={item}>{text}</label>
                                        </div>
                                    )
                                })

                            }
                        </div>

                        <div>
                            <select id="user-type" name="user-type" value={Role} onChange={setValueInput.bind(this, "role")} >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                            <label htmlFor="user-type">نقش</label>
                        </div>
                        <div>
                            <select id="workExperience" name="workExperience" value={workExperience}
                                onChange={setValueInput.bind(this, "workExperience")} >
                                <option value="lessoneyear">کمتر ازیک سال</option>
                                <option value="betweenoneandtwoyear">بین یک تا دو سال</option>
                                <option value="moretwoyear">بیشتر از دو سال</option>
                            </select>
                            <label htmlFor="workExperience">سابقه کار</label>
                        </div>
                        <div>
                            <input className="btn btn-sm btn-success btn-custom" type="button" value="ثبت" onClick={submit.bind(this)} />
                            <input className="btn btn-sm btn-danger btn-custom" type="button" value="کنسل" onClick={userListContext.ShowFormMethod.bind(this, false)} />
                        </div>

                    </form>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalComponent;