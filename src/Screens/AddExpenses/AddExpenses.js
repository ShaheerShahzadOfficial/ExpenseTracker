import React, { useEffect, useState } from "react";
import "./AddExpenses.css";
import MaterialTable from "@material-table/core";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as XLSX from "xlsx";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { AddAnExpense ,Logout} from "../../Redux/Actions";
import { AddExpenseReset } from "../../Redux/constants";
import image from "../../Images/AddExpenses.jpg"
import Modal from "@mui/material/Modal"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InsertPhoto from "@mui/icons-material/InsertPhoto";

import LaunchIcon from '@mui/icons-material/Launch';

import LogoutIcon from '@mui/icons-material/Logout';




const AddExpenses = ({history}) => {
    const [FileType, setFileType] = useState("");
    const [Month, setMonth] = useState("");
    const [column, setColumn] = useState();
    const [dataRef, setDataRef] = useState();
    const [imageUrl, setimageUrl] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [TotalExpenses, setTotalExpenses] = useState("")
    const [File, setFile] = useState("")
    const [open, setOpen] = useState(false)
    const { loading, expense, success,error } = useSelector(state => state.AddExpense)

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch({
                type: AddExpenseReset
            })
        }

       
    }, [dispatch, success])



    async function onChange(event) {
        var file = event.target.files[0];
        setFile(file)
        setPdfUrl("");
        setColumn("");
        setDataRef("");
        var reader = new FileReader();
        reader.onload = async function (event) {
            var base64Data = event.target.result;
            const type = base64Data.split(";")[0].split("/")[1];
            console.log(type, "===================>type");
            if (type === "jpeg" || type === "png" || type === "jpg") {
                setimageUrl(event.target.result);
            }
            // console.log(event.target.result);
        };

        reader.readAsDataURL(file);
    }
    // console.log(FileType)

    const convertToJson = (headers, data) => {
        const rows = [];
        data.forEach(row => {
            let rowData = {};
            row.forEach((element, index) => {
                rowData[headers[index]] = element;
            });
            rows.push(rowData);
        });
        return rows;
    };

    const importCsv = e => {
        const file = e.target.files[0];
        setFile(file)
        setPdfUrl("");
        setimageUrl("");
        console.log(file);
        const reader = new FileReader();

        reader.onload = event => {
            // parse Data
            const bstr = event.target.result;

            const workbook = XLSX.read(bstr, { type: "binary" });
            const workbookSheet = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[workbookSheet];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
            const headers = fileData[0];
            const heads = headers.map(head => ({ title: head, field: head }));
            console.log(heads);
            setColumn([heads]);

            //removing header
            fileData.splice(0, 1);
            setDataRef(convertToJson(headers, fileData));
            console.log(fileData);
        };
        reader.readAsBinaryString(file);
    };

    const PdfViewer = event => {
        var file = event.target.files[0];
        console.log(file, 'file===>104')
        setFile(event.target.files[0])
        setimageUrl("");
        setColumn("");
        setDataRef("");
        var reader = new FileReader();
        reader.onload = async function (event) {
            var base64Data = event.target.result;
            // const type = base64Data.split(";")[0].split("/")[1];
            // console.log(type, "===================>type");

            // console.log(event.target.result);

            const base64 = base64Data;
            const pdfContentType = "application/pdf";

            const base64toBlob = data => {
                // Cut the prefix `data:application/pdf;base64` from the raw base 64
                const base64WithoutPrefix = data.substr(
                    `data:${pdfContentType};base64,`.length
                );

                const bytes = atob(base64WithoutPrefix);
                let length = bytes.length;
                let out = new Uint8Array(length);

                while (length--) {
                    out[length] = bytes.charCodeAt(length);
                }

                return new Blob([out], { type: pdfContentType });
            };

            setPdfUrl(URL.createObjectURL(base64toBlob(base64)));
        };

        reader.readAsDataURL(file);
    };

    const defaultLayoutPluginInstance = defaultLayoutPlugin();




    const add = async () => {




        if (TotalExpenses !== "" && FileType !== "") {
            if (Month !== "" && File) {


                const myForm = new FormData();
                myForm.set("ExpenseTotal", TotalExpenses);
                myForm.set("FileType", FileType)
                myForm.set("Month", Month)
                myForm.set("file", File)
                dispatch(AddAnExpense(myForm))

                if (success) {
                    swal("Success", "Expense Has Been Added", "success")
                    setTotalExpenses("")
                    setFile("")
                    setMonth("")
                    setFileType("")
                    setimageUrl("")
                    setPdfUrl("")
                    setColumn("")
                    setDataRef("")
                }

                if (error){
                    swal("Error", "Expense Has Not Been Added", "error")
                    dispatch({
                        type: AddExpenseReset
                    })   
                }
                if (expense) {
                    swal("Success", "Expense Has Been Added", "success")
                    setTotalExpenses("")
                    setFile("")
                    setMonth("")
                    setFileType("")
                    setimageUrl("")
                    setPdfUrl("")
                    setColumn("")
                    setDataRef("")
                }

            } else {
                swal("Ooops", "You Forgot To Write Something!", "warning")
            }
        } else {
            swal("Ooops", "You Forgot To Write Something!", "warning")
        }
    }



    const handleOpen = () => { setOpen(true); }
    const handleClose = () => {
        setOpen(false);
    }


    const logout = ()=>{
        dispatch(Logout())
        if(window.location.pathname !=="/Register" || window.location.pathname !=="/Login"){
          history.push("Login")
        }
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
        <div className="MainDiv">

            <div className="FormContainerDiv">
                <div className="AddExpenseForm">
                    <br />
                    <br />
                    <h1>Add Expenses</h1>
                    <br />
                    <input type="number" placeholder="Add Expenses" value={TotalExpenses} onChange={e => { setTotalExpenses(e.target.value) }} />
                    <br />
                    <br />
                    <select
                        className="select"
                        onChange={e => setMonth(e.target.value)}
                        value={Month}
                    >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>


                    </select>
                    <br />
                    <br />
                    <select
                        className="select"
                        onChange={e => setFileType(e.target.value)}
                        value={FileType}
                    >
                        <option value="">Select File Type</option>
                        <option value="Images">Images</option>
                        <option value="Pdf_Files">Pdf Files</option>
                        <option value="Csv_Files">Csv Files</option>
                    </select>
                    <br />

                    {/* File Uploader */}

                    {/* Images Uploader */}

                    {FileType === "Images"
                        ? <div>
                            <input
                                accept="image/*"
                                className={"input"}
                                id="icon-button-photo"
                                onChange={onChange}
                                style={{ display: "none" }}
                                type="file"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                // style={{ padding: "1vmax" }}
                            >
                                <label htmlFor="icon-button-photo">
                                    Upload
                                </label>
                            </Button>
                            <IconButton size="large" aria-label="Add Expenses">
                                <label htmlFor="icon-button-photo">
                                    <InsertPhoto fontSize="large" color="primary" />
                                </label>
                            </IconButton>
                        </div>
                        : <div style={{ display: "none" }} />}

                    {/* PDF  Uploader */}

                    {FileType === "Pdf_Files"
                        ? <div>
                            <input
                                name="file1"
                                id="Pdf_Files"
                                type="file"
                                accept="application/pdf"
                                style={{ display: "none" }}
                                onChange={PdfViewer}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                // style={{ padding: "1vmax" }}
                            >
                                <label htmlFor="Pdf_Files">
                                    Upload
                                </label>
                            </Button>
                            <IconButton size="large" aria-label="Add Expenses">
                                <label htmlFor="Pdf_Files">
                                    <PictureAsPdfIcon fontSize="large" color="primary" />
                                </label>
                            </IconButton>
                        </div>
                        : <div style={{ display: "none" }} />}

                    {/* CSV Files */}

                    {FileType === "Csv_Files"
                        ? <div>
                            {" "}<input
                                name="file2"
                                id="Csv_Files"
                                type="file"
                                accept=".csv"
                                style={{ display: "none" }}
                                onChange={importCsv}
                            />
                            <Button
                                variant="contained"
                                color="primary"

                                className="uploadBtn"
                            >
                                <label htmlFor="Csv_Files">
                                    Upload
                                </label>
                            </Button>
                            <IconButton size="large" aria-label="Add Expenses">
                                <label htmlFor="Csv_Files">
                                    <AttachFileIcon fontSize="large" color="primary" />
                                </label>
                            </IconButton>
                        </div>
                        : <div style={{ display: "none" }} />}

                    {/*File Uploaders Ends here  */}

                    {column || dataRef || imageUrl || pdfUrl ?
                        <div>
                            <Button onClick={handleOpen} color="primary" variant="contained">Preview File
                                {/* <OpenInNewIcon /> */}
                            </Button>
                            <IconButton>
                                <OpenInNewIcon onClick={handleOpen} fontSize="large" color="primary" />
                            </IconButton>
                        </div>
                        : <div style={{ display: "none" }} />}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="File Preview"
                        aria-describedby="File Preview"
                    >
                        <div style={{ width: "50%", marginTop: "2vmax", marginRight: "auto", marginLeft: "auto" }}>
                            {
                                imageUrl
                                    ? <div
                                        style={{
                                            overflow: "auto",
                                            height: "85vmin",
                                            marginTop: "15vmin",
                                            marginRight: "1vmax"
                                        }}
                                    >
                                        <img src={imageUrl} alt="ImageViewer" width={"85%"} />
                                    </div>
                                    : <div style={{ display: "none" }} />}

                            {dataRef && column
                                ? <div
                                    style={{
                                        overflow: "auto",
                                        height: "90vmin",
                                        marginTop: "1vmin",
                                        marginRight: "1vmax"
                                    }}
                                >
                                    <MaterialTable
                                        back
                                        columns={column[0]}
                                        title={"Expenses"}
                                        data={dataRef}
                                    />
                                </div>
                                : <div style={{ display: "none" }} />}

                            {pdfUrl
                                ? <div
                                    className="fileViewer"
                                    style={{
                                        overflow: "hidden",
                                        height: "90vmin",
                                        marginTop: "1vmin",
                                        marginRight: "1vmax"
                                    }}
                                >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                                        {" "}<Viewer
                                            initialPage={1}
                                            theme="dark"
                                            Scroll
                                            fileUrl={pdfUrl}
                                            plugins={[defaultLayoutPluginInstance]}
                                        />
                                        ;
                                    </Worker>
                                </div>
                                : <div style={{ display: "none" }} />}
                        </div>
                    </Modal>
<br />
                    {/* <br /> */}
                    <Button type="submit"
                        style={{
                            backgroundColor: "#000",
                            color: "#FFFFFF",
                            width: "90%",
                            padding: "1vmax"
                        }}
                        onClick={() => { add() }}
                    >
                        <Typography variant="p">Submit Expenses</Typography>
                    </Button>
                    
                </div>
                <br />

                <p style={{cursor:"pointer",color:"black",fontSize:"1.5vmax",fontWeight:"500"}} onClick={()=> history.push("/AddExpenseAndCreatePdf")}>Want to Create Pdf File Of Your Expenses <br/> <span style={{fontWeight:"800",color:"blue",textDecoration:"underline"}}>Click Here !</span> </p>

            </div>


            <div className="File_Viewer">

                <img src={image} alt="Add Expenses" width={"80%"} />
            </div>

        </div >
        </div>
    );
};

export default AddExpenses;
