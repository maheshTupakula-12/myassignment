import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(){
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',
        password:'',
    }) 
    function handleChange(e){
        setFormData((formData)=>{
            return {
                ...formData,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData)
        try{
            const { data } = await axios.post(
                "http://localhost:5000/api/login",
                formData,
                {
                    withCredentials: true
                }
            );            
            console.log("data",data)
            toast.success(data.message)
            const name = data.userInfo.firstname+' '+data.userInfo.lastname;
            localStorage.setItem("id",data.userInfo.id)
            localStorage.setItem("name",name)
            console.log(data.userInfo)
            navigate("/home")
        }catch(err){
            console.log(err.response.data.message)
            console.log("error",err.message)
            toast.error(err.response.data.message)
        }
    }
    useEffect(()=>{
        localStorage.removeItem("id")
        localStorage.removeItem("name")
    },[])
    return (
        <div style={{height:'100vh',backgroundColor:'lightblue',position:'relative'}} >
            <Typography variant="h4" color="black">
                Login page
            </Typography>
            <div style={{marginLeft:10,marginTop:10}}>
            <Button variant='contained' color='secondary' onClick={()=>{navigate("/")}} >
                switch to Register
            </Button>
            </div>
            <form style={{display:'flex',flexDirection:'column',width:320,rowGap:10,position:'absolute',left:"50%",top:"50%",transform: "translate(-50%, -50%)"}} onSubmit={handleSubmit} >
                <label>email</label>
                <TextField value={formData.email} name="email" label='enter email' placeholder='eg:karthik123@gmail.com' onChange={handleChange} />
                <label>password</label>
                <TextField value={formData.password} name="password" label='enter password' placeholder="eg:karthi@12"  onChange={handleChange} />
                <input type="submit" value="submit" style={{padding:10,width:150,backgroundColor:'green',border:'none',cursor:'pointer'}} />
            </form>
        </div>
    )
}
export default Login;