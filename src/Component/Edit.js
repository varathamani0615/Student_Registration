import React, { useEffect } from "react";

import {Stack,TextField,RadioGroup,FormControlLabel,Radio,Button} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCalendarState } from "@mui/x-date-pickers/internals";
const Edit=()=>{
    const {id}=useParams();
    const navigate=useNavigate()
    const [value, setValue] =useState(dayjs(new Date));
    const [inputData,setinputdata]=useState({
        id:id,
        firstname:"",
        lastname:"",
        email:"",
        date:setValue,
        education:"",location:"",about:""
      });

    //   const [fname,setfname]=useState("")
   

      useEffect(()=>{
        axios.get("http://localhost:8001/api/student/"+id).then((res)=>{
            setinputdata(res.data)
        }).catch((err)=>{
         console.log(err.message);
        })
      },[])
    
      const handlesubmit=(e)=>{
        e.preventDefault();
       axios.put("http://localhost:8001/api/student/put/"+id,inputData).then((res)=>{
        alert("data updated successfull")
        navigate("/")
       })
      }

    return(
      <>
        <div className="container mt-3">
            <h2>Edit Student Details</h2>
            <form action="" onSubmit={handlesubmit}>
            <div className="row">
                
                <div className="col-md-6 mt-3">
                  <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center">First Name:</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic" placeholder="Enter your first name" variant="outlined" fullWidth value={inputData.firstname || ""}
                       onChange={e=>{setinputdata({...inputData,firstname:e.target.value})}} />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Last Name:</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic" placeholder="Enter your last name"  variant="outlined" fullWidth value={inputData.lastname}
                   onChange={e=>{setinputdata({...inputData,lastname:e.target.value})}}/>
                   </div>
                  </div>
                </div>
  
                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Email:</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic" placeholder="Enter your Email"  variant="outlined" fullWidth  value={inputData.email}
                   onChange={e=>{setinputdata({...inputData,email:e.target.value})}}/>
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Date:</label>
                   </div>
                   <div className="col-8">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DemoContainer components={['DatePicker', 'DatePicker']}>
        {/* <DatePicker  defaultValue={dayjs('')  setValue(newValue)} /> */}
        <DatePicker fullWidth value={value} onChange={e=>{setinputdata({...inputData,date:e.$d})}} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Education</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your Education"  value={inputData.education}
                   onChange={e=>{setinputdata({...inputData,education:e.target.value})}} />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                <div className="row">
                  <div className="col-4">
                     <label htmlFor="" className="text-center"> Location</label>
                   </div>
                   <div className="col-8">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your location"  value={inputData.location}
                   onChange={e=>{setinputdata({...inputData,location:e.target.value})}}/>
                   </div>
                  </div>
                </div>
     
                <div className="col-md-12 mt-3">
                <div className="row">
                  <div className="col-2">
                     <label htmlFor="" className="text-center"> About:</label>
                   </div>
                   <div className="col-10">
                   <TextField id="outlined-basic"  variant="outlined" fullWidth placeholder="Enter your details"  value={inputData.about}
                   maxRows={7} minRows={7} multiline  onChange={e=>{setinputdata({...inputData,about:e.target.value})}} />
                   </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-8">
                            <Button type="submit" className="btn btnsubmit" >Update</Button>
                        </div>
                    </div>
                </div>
                

                   
               </div>
            </form>
           
        </div>
      </>
    )
}

export default Edit;