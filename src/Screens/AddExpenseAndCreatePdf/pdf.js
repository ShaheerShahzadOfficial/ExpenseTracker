import React, { useEffect, useState } from "react";
import "./pdf.css"
import { Button, Typography, IconButton, Box, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { AddAnExpensewithoutFile, Logout, GetAllExpenseswithNoFile,deleteExpense,UpdateExpense } from "../../Redux/Actions";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import LaunchIcon from '@mui/icons-material/Launch';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddExpenseReset, DeleteExpenseReset,UpdateExpenseReset} from "../../Redux/constants";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';













const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };






const PdfGenerator = ({ history }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false)
    const [Expense, setExpense] = useState("")

    const [ExpenseName, setExpenseName] = useState("")

    const [ItemId, setItemId] = useState("")

    const dispatch = useDispatch();


    const { expenses } = useSelector(state => state.expenses)
    const { loading, success } = useSelector(state => state.AddExpense)

    const logout = () => {
        dispatch(Logout())
        if (window.location.pathname !== "/Register" || window.location.pathname !== "/Login") {
            history.push("Login")
        }
    }

const createPdf = ()=>{
    const doc = new jsPDF({
        orientation: "portrait"
      });
      
      doc.autoTable({
        // theme:"striped",
          
        bodyStyles:{fillColor:"lightblue",color:"white"}   ,
      
        columns: [
            { header: 'Expense Type', dataKey: 'type' },
            { header: 'Expense Cost', dataKey: 'price' },
          ],
          body: [
            { type: expenses.length !== 0 ? expenses?.map((item)=>   (item.ExpenseName)):"No Data"  },
            { price: expenses.length !== 0 ? expenses?.map((item)=>   (item.ExpenseTotal)):"No Data"},
          ],
          html: '#my-table',
        })
      doc.save("Expenses.pdf");
}

    useEffect(() => {
        dispatch(GetAllExpenseswithNoFile())
        if (success) {
            dispatch({
                type: AddExpenseReset
            })
            swal("Success", "Expense Has been Added Successfully", "success")

            dispatch(GetAllExpenseswithNoFile())

        }
    }, [dispatch, success])


    const add = (e) => {
        e.preventDefault()
        if (name && price) {
            dispatch(AddAnExpensewithoutFile(name, price))
            if (success) {
                swal("Success", "Expense Has been Added Successfully", "success")
                dispatch(GetAllExpenseswithNoFile())
                dispatch({ type: AddExpenseReset })
            }
            setName("")
            setPrice("")
        } else {
            swal("Ooops", "You Forgot To Write Something!", "warning")
        }
    }

    const deletedItem= (itemId)=>{
        dispatch(deleteExpense(itemId))
         swal("Deleted","Item Deleted SuccessFully","success")
         dispatch({type:DeleteExpenseReset})
    }


    // const updateItem= (itemId)=>{
    //     if(Expense,ExpenseName){
    //     dispatch(UpdateExpense(itemId,Expense,ExpenseName))
    //      swal("Updated","Item Updated SuccessFully","success")
    //      dispatch({type:UpdateExpenseReset})
    //     }else {
    //         swal("Ooops", "You Forgot To Write Something!", "warning")
    //     }
    // }


    const handleOpen = (id) => { setOpen(true)
    setItemId(id)
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <div>
            <div className={"Nav"}>

                <div className='h1Container'>
                    <Typography variant='h4' component={"p"}>Expenses</Typography>
                </div>

                <div className={"btnContainer"}>
                    <Button variant="contained" startIcon={<LaunchIcon />} style={{ width: "60%", padding: "1vmax" }} onClick={() => { history.push("/") }}>All Expenses</Button>
                    {/* <Button variant="outline" startIcon={<LogoutIcon  />} color={"primary"} style={{width:"40%",padding:"1vmax"}} onClick={()=>{history.push("/AddExpenses")}}>LogOut</Button> */}
                    <Button variant="outlined" startIcon={<LogoutIcon />} style={{ width: "40%", padding: "1vmax", marginLeft: "1vmax" }} onClick={logout}>LogOut</Button>
                </div>




            </div>
            <div className="container">
                <div className="form">
                    <form className="AddExpenseForm" onSubmit={add}>
                        <br />
                        <h1>Add Expenses</h1>
                        <br />
                        <input type="text" placeholder={"Expense Name"} value={name} onChange={e => setName(e.target.value)} />

                        <br />
                        <br />


                        <input type="number" placeholder={"Expense Price"} value={price} onChange={e => setPrice(e.target.value)} />
                        <br /><br />

                        <Button type="submit"
                            style={{
                                backgroundColor: "#000",
                                color: "#FFFFFF",
                                // width: "78%",
                                padding: "1vmax"
                            }}>
                            <Typography variant="p">Submit Expenses</Typography>
                        </Button>
                    </form>

                    <br />
                    
                   { expenses.length !== 0 ?<Button  startIcon={<ArrowCircleDownIcon />}
                        variant="contained"   onClick={createPdf} >
                    
                        <Typography variant="p" component={"h5"}>Create Pdf</Typography>
                    
                    </Button> : <div style={{display:"none"}}></div>}

                </div>
                <div className="ExpenseContainer">
                    <div>
                        <br />
                        <h1 style={{ color: "black" }}>All Expenses</h1>
                        <br />
                        {expenses.length !== 0 ? <table id="my-table" style={{ margin: "auto", width: "80%", border: "2px solid" }}>
                            {/* <tr>
                                <th>Expense Name</th>
                                <th>Expense Cost</th>
                            </tr> */}
                            {
                                expenses ? expenses.map((item, i) => (
<>
                                    <tr>
                                        <td>{item?.ExpenseName}</td>
                                        <td>{item?.ExpenseTotal}</td>
                                    <td style={{cursor:"pointer"}} onClick={()=>deletedItem(item?._id)}> <DeleteIcon size={"medium"}/> </td>
                                    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="Update Expense"
  aria-describedby="Update Expense"
>
  <Box  sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
     Update Expense
    </Typography>
    
    <TextField id="standard-basic" label="Expense Name" variant="standard"  value={ExpenseName}  onChange={e=>setExpenseName(e.target.value)} />

    <TextField id="standard-basic" label="Expense Total" variant="standard" type="number"  value={Expense} onChange={e=>setExpense(e.target.value)}/>

<br/>
<br/>

    <Button color={Expense !== price || ExpenseName !== name ? "success" : "secondary"}
                        variant="contained"    onClick={()=>{
                            if(Expense && ExpenseName){
                                if(Expense !== price || ExpenseName !== name){

                                
                                dispatch(UpdateExpense(ItemId,Expense,ExpenseName));
                                 swal("Updated","Item Updated SuccessFully","success");
                                 setExpense("")
                                 setExpenseName("")
                                 setOpen(false)
                                 setItemId("")
                                 dispatch({type:UpdateExpenseReset});
                                } else {
                                    setOpen(false)
                                }
                                }else {
                                    swal("Ooops", "You Forgot To Write Something!", "warning")
                                }
                        }
                        }>
                    
                        <Typography variant="p" component={"h5"}>  {Expense !== price || ExpenseName !== name ? "update" : "cancel"} </Typography>
                    
                    </Button>

  </Box>
                                    </Modal>

                                    <td style={{cursor:"pointer"}} 
                                    onClick={()=>{setOpen(true); setItemId(item?._id); setExpense(item?.ExpenseTotal); setExpenseName(item?.ExpenseName);setName(item?.ExpenseName);setPrice(item?.ExpenseTotal) }}> <EditIcon size={"medium"}/> </td>


                                    </tr>


</>

                                )) :
                                    <h1>No Record Found</h1>
                            }
                        </table> : <h1>No Record Found</h1>

                        }


                    </div>
                </div>
            </div>

        </div>
    )
}

export default PdfGenerator