import React, { useEffect,useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography, Modal } from '@mui/material';
import "./AllExpenses.css"
import LaunchIcon from '@mui/icons-material/Launch';
import { useDispatch, useSelector } from "react-redux"
import { GetAllExpenses,Logout } from '../../Redux/Actions';
import Loader from "../../Loader/loader"
import LogoutIcon from '@mui/icons-material/Logout';

const AllExpenses = ({ history }) => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetAllExpenses())
  }, [dispatch])

  const { expenses, loading } = useSelector(state => state.expenses)

const logout = ()=>{
  dispatch(Logout())
  if(window.location.pathname !=="/Register" || window.location.pathname !=="/Login"){
    history.push("Login")
  }
}

  const handleOpen = () => { setOpen(true); }
  const handleClose = () => {
      setOpen(false);
  }

  return (

    <div>
      {loading ? <Loader /> :
        <div>
          <div className={"Nav"}>


            <div className='h1Container'>
              <Typography variant='h4' component={"p"}>Expenses</Typography>
            </div>

            <div className={"btnContainer"}>
              <Button variant="contained" startIcon={<AddIcon />} style={{ width: "60%", padding: "1vmax" }} onClick={() => { history.push("/AddExpenses") }}>Add Expenses</Button>
              {/* <Button variant="outline" startIcon={<LogoutIcon  />} color={"primary"} style={{width:"40%",padding:"1vmax"}} onClick={()=>{history.push("/AddExpenses")}}>LogOut</Button> */}
              <Button variant="outlined" startIcon={<LogoutIcon />} style={{ width: "40%", padding: "1vmax", marginLeft: "1vmax" }} onClick={logout}>LogOut</Button>
            </div>



          </div>





          <div className={"ExpenseConatiner"}>

            <h1 className='homeHeading'>All Expenses</h1>

            <div className={"Expenses"}>


              {expenses ?
                expenses.map((item, i) => (
                  <div className="Box" key={item?._id}>
                    <div key={item?._id}>
                      {item?.FileType === "Images" ? <img width={"150px"} className={"Img"} src={item.ExpenseFile} alt={item?.FileType} />
                        :
                        item?.FileType === "Pdf_Files" ?

                          <img width={"150px"} className={"Img"} src="https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png" alt="Pdf_Files" /> :

                          <img width={"150px"} className={"Img"}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoC5dBIA1yGmfSlJTA5NTgV-JS-lhCUCd0Cg&usqp=CAU" alt="CSV_FILES" />}
                      {/*  */}
                    </div>

                    <div>
                      <Typography variant='h6' component={"p"}>Expenses Cost: {item?.ExpenseTotal}</Typography>
                      <Typography variant='h6' component={"p"}>Month {item?.Month}</Typography>

                      {/* <Button variant="contained" startIcon={<LaunchIcon />} style={{width:"100%",padding:"1vmax"}} >View File </Button>       */}



                      {item?.FileType === "Images" ? 
                      <div>
                      <Button variant="contained" onClick={handleOpen} startIcon={<LaunchIcon />} style={{ width: "100%", padding: "1vmax" }} >View File </Button>
                                            <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="File Preview"
                                            aria-describedby="File Preview"
                    
                                          >
                                            <div style={{ width: "50%", marginTop: "2vmax", marginRight: "auto", marginLeft: "auto" }}>
                                            <div
                                                            style={{
                                                                // overflow: "auto",
                                                                height: "70vmin",
                                                                marginTop: "15vmin",
                                                                marginRight: "1vmax"
                                                            }}
                                                        >
                                                            <img src={item?.ExpenseFile} alt={item?.ExpenseFile} width={"85%"} />
                                                        </div>
                                                        </div>
                                          </Modal>
                                          </div>

                        :
                        item?.FileType === "Pdf_Files" ?

                        <a style={{ textDecoration: "none", color: "white" }} href={item?.ExpenseFile} target="_blank" rel="noreferrer">  <Button variant="contained" startIcon={<LaunchIcon />} style={{ width: "100%", padding: "1vmax" }} >View File</Button> </a>
                          :
                          <a style={{ textDecoration: "none", color: "white" }} href={item?.ExpenseFile} rel="noreferrer">  <Button variant="contained" startIcon={<LaunchIcon />} style={{ width: "100%", padding: "1vmax" }} >View File </Button> </a>
                      }



                    </div>

                  </div>
                )) : <h1>No Record Found</h1>}




            </div>
          </div>


        </div>
      }
    </div>

  )
}

export default AllExpenses