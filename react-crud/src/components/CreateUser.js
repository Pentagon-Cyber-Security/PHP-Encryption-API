import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './createuser.css';
export default function CreateUser(){
    const navigate=useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        mobile: '',
        encryption_key: ''  // Add encryption_key to the state
    });

    //const [inputs, setInputs]=useState({})
    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=>({...values,[name]:value}));
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        
        axios.post('http://localhost:8888/api/user/save',inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    } 
    return(
        <div className="container">
            <h1 className="header">Simple Data Shield</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <label>Name:</label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} value={inputs.name}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email:</label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange} value={inputs.email}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile:</label>
                            </th>
                            <td>
                                <input type="text" name="mobile" onChange={handleChange} value={inputs.mobile}></input>
                            </td>
                        </tr>
                        <tr>
                            <th><label>Encryption Key:</label></th>
                            <td><input type="text" name="encryption_key" onChange={handleChange} value={inputs.encryption_key} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: '10px' }}><button>Save</button></td>
                        </tr>
                    </tbody>
                </table>


                
                <br/><br/>
                
                <br/><br/>
                
                <br/><br/>
                
            </form>
        </div>
    )
}