import { Component } from "react";
import "./UserListForm.css";
import UserListContext from "../../Contexts/UserListContext"

class UserListForm extends Component {
    
    static contextType = UserListContext;

    state = {
        name: "",
        day: "",
        month: "",
        year: "",
        email: "",
        Role: "user",
        title: "",
        field: "",
        age: "",
        workExperience:"lessoneyear"
    }

    setValueInput(name, event) {
        this.setState({ [name]: event.target.value })
    }

    submit(event){
        event.preventDefault();
        let {  day, month, year,name,email,Role,title,field,age,workExperience} = this.state;

        if (!isNaN(Number(name)) || name== "")
            return alert("نام را به درستی وارد کنید");
        else if (isNaN(Number(day)) || Number(day) == 0 || Number(day) > 31)
            return alert("روز را به درستی وارد کنید");
        else if (isNaN(Number(month)) || Number(month) == 0 || Number(month) > 12)
            return alert("ماه را به درستی وارد کنید");
        else if (isNaN(Number(year)) || Number(year) == 0)
            return alert("سال را به درستی وارد کنید");
        else if (title=="")
            return alert("عنوان شغلی را به درستی وارد کنید");
        else if (field=="")
            return alert("رشته تحصیلی را به درستی وارد کنید");
        else if (isNaN(Number(age)) || age=="")
            return alert("سن را به درستی وارد کنید");
        let key = Date.now();
        this.context.AddUser([key, [name,  (year+"/"+month+"/"+ day),title,field, age,workExperience,email,Role,key]]);
        
    }

    render() {

        let { day, month, year,name,email,Role,title,field,age,workExperience } = this.state;

        return (
            <form>
                <div>
                    <input type="text" id="name" name="name" className="input-custom"
                        value={name} placeholder="نام و نام خانوادگی" onChange={this.setValueInput.bind(this, "name")} />
                    <label htmlFor="name">نام</label>
                        </div>
                    <div className="date-input">
                        <div>
                            <input type="text" id="year" name="date" className="input-custom"
                                value={year} placeholder="سال" onChange={this.setValueInput.bind(this, "year")} />
                        </div>
                        <div>
                            <input type="text" id="month" name="date" className="input-custom"
                                value={month} placeholder="ماه" onChange={this.setValueInput.bind(this, "month")} />
                        </div>
                        <div>
                            <input type="text" id="day" name="date" className="input-custom"
                                value={day} placeholder="روز" onChange={this.setValueInput.bind(this, "day")} />
                        </div>
                        <label htmlFor="date">تاریخ</label>
                    </div>
                <div>
                    {

                    ["title","field","age","email"].map((item, index) => {
                        let text = item == "title" ? "عنوان شغلی" : 
                            item == "field" ? "رشته تحصیلی" : item == "age" ? "سن" : "ایمیل";
                        let valueItem = item == "title" ? title : 
                            item == "field" ? field : item == "age" ? age : email;
                        return( 
                            <div key={index}> 
                                <input type={item} id={item} name={item} className="input-custom"
                                    placeholder={text}  value={valueItem} onChange={this.setValueInput.bind(this, item)}  />
                                <label htmlFor={item}>{text}</label>
                            </div>
                        )
                    })
                    
                    }
                </div>
            
                <div>
                    <select id="user-type" name="user-type" value={Role} onChange={this.setValueInput.bind(this, "Role")} >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    <label htmlFor="user-type">نقش</label>
                </div>
                <div>
                    <select id="workExperience" name="workExperience" value={workExperience}
                     onChange={this.setValueInput.bind(this, "workExperience")} >
                        <option value="lessoneyear">کمتر ازیک سال</option>
                        <option value="betweenoneandtwoyear">بین یک تا دو سال</option>
                        <option value="moretwoyear">بیشتر از دو سال</option>
                    </select>
                    <label htmlFor="workExperience">سابقه کار</label>
                </div>
                <div>
                    <input className="btn btn-sm btn-success btn-custom" type="submit" value="ثبت" onClick={this.submit.bind(this)} />
                    <input className="btn btn-sm btn-danger btn-custom" type="submit" value="کنسل" onClick={this.context.ShowFormMethod.bind(this,false)} />
                </div>
            </form>
        )
    }
}

export default UserListForm;