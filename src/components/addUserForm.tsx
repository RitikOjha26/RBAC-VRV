import React, { useState } from 'react';
import { TextField, Button, Stack, FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { addUser} from '../api/users';
import { useAuth } from '../context/authContext';
import '../styles/addUserForm.css'

interface AddUserProps {
    onClose: () => void;
    onUserDataUpdated: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onClose, onUserDataUpdated }) => {
    const { fetchUserList} = useAuth();
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roleId, setRoleId] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newUser = { userId, userName, email, password, roleId, active };
            const addedUser = await addUser(newUser);
            console.log(addedUser);

            // Clear the form
            // setUserId("");
            // setUserName("");
            // setEmail("");
            // setPassword("");
            // setRoleId("");
            // setActive(true);

            await fetchUserList();
            onClose();
            
        } catch (err: any) {
            console.log("Error " , err);
        }
    };

    return (
        <div className="user-form">
            <React.Fragment>
                
                <Box
                    sx={{
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth:'500px',
                        
                        gap: 2,
                    }}
                >
                <form onSubmit={handleSubmit}
                    
                >
                    <h2 className='form-heading'>Add User</h2>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="User Id"
                            onChange={e => setUserId(e.target.value)}
                            value={userId}
                            fullWidth
                            required
                            sx={{
                                background: 'rgba(255, 255, 255, 0.5)', // glass effect on input
                                backdropFilter: 'blur(10px)',
                                borderRadius: '8px',
                            }}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="User Name"
                            onChange={e => setUserName(e.target.value)}
                            value={userName}
                            fullWidth
                            required
                            sx={{
                                background: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '8px',
                            }}
                        />
                    </Stack>
                    <TextField
                        type="email"
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{
                            mb: 4,
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                        }}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        fullWidth
                        sx={{
                            mb: 4,
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                        }}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Role Id"
                        onChange={e => setRoleId(e.target.value)}
                        value={roleId}
                        fullWidth
                        required
                        sx={{
                            mb: 4,
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                        }}
                    />
                    <FormControl component="fieldset" sx={{ mb: 1 }} className='radio-button'>

                        <RadioGroup
                            row
                            value={active ? "true" : "false"}
                            onChange={(e) => setActive(e.target.value === "true")}

                        >
                            <FormControlLabel value="true" control={<Radio />} label="Active" sx={{
                                color: 'rgba(255, 255, 255, 0.5)', mb: 4, background: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '8px',
                                paddingRight: '10px',
                                
                                marginLeft: '1px'
                            }} />
                            <FormControlLabel value="false" color="secondary" control={<Radio />} label="Inactive" sx={{
                                mb: 4,  background: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '8px',
                                paddingRight: '10px'
                            }} />
                        </RadioGroup>
                    </FormControl>
                    <div className="form-button">
                        <Button variant="outlined" color="secondary" type="submit" sx={{
                            color: 'blue',
                            borderColor: 'blue',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                            marginBottom: 2,
                            merginRight: 1,
                        }}
                            onClick={onUserDataUpdated}>Add User</Button>
                        <Button variant="outlined" sx={{
                            color: 'red',
                            borderColor: 'red',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                            marginBottom: 2,
                        }} onClick={onClose}>Close</Button>
                    </div>

                </form>
                </Box>
            </React.Fragment>
        </div>
    );
};

export default AddUser;
