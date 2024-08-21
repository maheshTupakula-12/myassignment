import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register(){
    const [formData,setFormData] = useState({
        firstname:'',
        lastname:'',
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
            const {data} = await axios.post("http://localhost:5000/api/register",formData);
            console.log("data",data)
        }catch(err){
            console.log(err.response.data.message)
            console.log("error",err.message)
        }
    }
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.removeItem("id")
            localStorage.removeItem("name")
    },[])
    return (
        <div style={{height:'100vh',backgroundColor:'lightblue',position:'relative'}}>
            <Typography variant="h4" color="black">
                Register page
            </Typography>
            <div style={{marginLeft:10,marginTop:10}}>
            <Button variant='contained' color='secondary'onClick={()=>{navigate("/login")}} >
                switch to login
            </Button>
            </div>
            <form style={{display:'flex',flexDirection:'column',width:320,rowGap:10,position:'absolute',left:"50%",top:"50%",transform: "translate(-50%, -50%)"}} 
                onSubmit={handleSubmit}
            >
                <label>firstname</label>
                <TextField value={formData.firstname} name="firstname" label='enter firstname' placeholder='karthik' onChange={handleChange} />
                <label>lastname</label>
                <TextField value={formData.lastname} name="lastname" label='enter lastname' placeholder="bhairava" onChange={handleChange}  />
                <label>email</label>
                <TextField value={formData.email} name="email" label='enter email' placeholder='eg:karthik123@gmail.com' onChange={handleChange}  />
                <label>password</label>
                <TextField value={formData.password} name="password" label='enter password' placeholder="eg:karthi@12" onChange={handleChange}  />
                <input type="submit" value="submit" style={{padding:10,width:150,backgroundColor:'green',border:'none',cursor:'pointer'}} />
            </form>
        </div>
    )
}
export default Register;