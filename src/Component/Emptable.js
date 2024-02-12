import React, { useEffect, useState } from "react";
import './Emptable.css';
import axios from 'axios'
import { Paper ,Table,TableContainer,TableHead,TableBody ,TableCell
    ,TableRow,Dialog,DialogTitle,DialogContent} from "@mui/material";

    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import { Button } from "@mui/material";
    import Trash from './Image/trash.png';
        // import Button from '@mui/material/Button'; 
import { Link } from "react-router-dom";
const Emptable=()=>{
   const [data,setdata]=useState([]);
   const [open,openchange]=useState(false);
   const [show,setshow]=useState(false);
    const columns=[
        {id:"id",name:"Id"},
        {id:"fname",name:"First Name"},
        {id:"lsname",name:"Last Name"},
        {id:"location",name:"Location"},
        {id:"email",name:"Email"},
        {id:"dob",name:"DOB"},
        {id:"education",name:"Education"},
        {id:"action",name:"Action"},
        {id:"delete",name:"Delete"}
    ];

    const handledelete=(id)=>{
        openpopup(id);

    }
    const openpopup=(id)=>{
        console.log(id);
        const so=show
        console.log(so);
        handletrash()
        if(show ){
            console.log("del");
        }
        something(id)
        
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    const handlecancel=()=>{
        openchange(false)
        console.log("mm");
       
    }

    const  handletrash=()=>{
         setshow(true)
    }

    const something=(id)=>{
      if(show){
        console.log("ok");
      }
    }
    const handledelete2=(id)=>{
     axios.delete("http://localhost:8001/api/student/del/"+id).then((res)=>{
     openpopup(id)
     }) 
     console.log("del");
    }

    useEffect(()=>{
     axios.get("http://localhost:8001/api/student/").then((res)=>{
        setdata(res.data);
    //   console.log(res.data);
     }).catch((err)=>{
        console.log(err.message);
     })
     
    })

    

    return(
        <>
        <div className="container mt-3">
        <div>
            <h2>Student managemant system</h2>
        </div>
   


        <Paper sx={{margin:"1%"}}>
            <div style={{margin:"1%"}}>
                <Link   className="btn btn-dark addbtn" to="/create">ADD </Link>
            </div>
            <TableContainer>
                <Table>

                <TableHead>  
                <TableRow >
                    {
                      columns.map((column)=>(
                        <TableCell key={column.id} >{column.name}</TableCell>
                      ))
                    
                    }
                 </TableRow>
                       </TableHead>

                <TableBody>
                {
                    data.map((data,i)=>(
                        <TableRow key={i}>
                            <TableCell>{data.id}</TableCell>
                            <TableCell>{data.firstname}</TableCell>
                            <TableCell>{data.lastname}</TableCell>
                            <TableCell>{data.location}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.education}</TableCell>
                            <TableCell> <Link to={`/edit/${data.id}`}> <EditIcon className="icon"/> </Link> </TableCell>
                            <TableCell><Button onClick={e=>handledelete2(data.id)}> <DeleteIcon className="icon"/> </Button></TableCell>
                        </TableRow>
                    ))
                }
 
                </TableBody>

                </Table>
            </TableContainer>
         </Paper>
         
         <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
            <DialogTitle>
            <div className="trashcenter my-2">
            <img src={Trash} alt="" srcset="" className="trashimage" />
            </div>
               <div className="center mt-3">
               
               
               <h2>You Deleted Successfully !!</h2>
               
               </div>
                
            </DialogTitle>
            <DialogContent>
              <div className="center">
              <Button onClick={handlecancel} className="btnokay" >OKay</Button>
              </div>
               
            </DialogContent>
         </Dialog>

         </div>

        </>
    )
}

export default Emptable;