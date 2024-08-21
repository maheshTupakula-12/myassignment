import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const username = localStorage.getItem('name')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        user_id: localStorage.getItem("id"),
    })
    const [candidates, setCandidates] = useState([]);
    async function fetchCandidates() {
        const { data } = await axios.post("http://localhost:5000/candidate/get", { user_id: formData.user_id },
            {
                withCredentials: true
            }
        )
        setCandidates(data['data'])
    }
    useEffect(() => {
        fetchCandidates()
    }, [])
    function handleChange(e) {
        setFormData((formData) => {
            return {
                ...formData,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:5000/candidate/add", formData, {
                withCredentials: true
            });
            console.log(data)
            toast.success(data.message)
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                user_id: localStorage.getItem("id"),
            })
        } catch (err) {
            console.log(err)
        }
    }
    async function logout() {
        try {
            const { data } = await axios.get("http://localhost:5000/api/logout", {
                withCredentials: true,
            });
            toast.success(data.message)
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div style={{ padding: 5, height: '100vh', backgroundColor: 'lightblue', position: 'relative', fontSize: 20, fontWeight: 400, marginBottom: 10 }} >
            welcome {username}
            <br />
            <div>
            <Button style={{marginRight:20,}} variant='contained' color='secondary' onClick={logout} >
                logout
            </Button>
            <Button variant='contained' color='secondary' onClick={fetchCandidates} >
                refresh
            </Button>
            </div>
            <div style={{ textAlign: 'center', fontSize: 28, fontWeight: 700 }}>
                Home Page
                <br />
                (Add Candidate)
            </div>
            <h1>Candidate List</h1>
            <ul>
                {
                    candidates?.map((item) => (
                        <li key={item.id}>{item.firstname + ' ' + item.lastname}</li>
                    ))
                }
            </ul>
            <form style={{ display: 'flex', flexDirection: 'column', width: 320, rowGap: 10, position: 'absolute', left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                onSubmit={handleSubmit}
            >
                <label>firstname</label>
                <TextField value={formData.firstname} name="firstname" label='enter firstname' placeholder='karthik' onChange={handleChange} />
                <label>lastname</label>
                <TextField value={formData.lastname} name="lastname" label='enter lastname' placeholder="bhairava" onChange={handleChange} />
                <label>email</label>
                <TextField value={formData.email} name="email" label='enter email' placeholder='eg:karthik123@gmail.com' onChange={handleChange} />
                <input type="submit" value="submit" style={{ padding: 10, width: 150, backgroundColor: 'green', border: 'none', cursor: 'pointer' }} />
            </form>
        </div>
    )
}
export default Home;