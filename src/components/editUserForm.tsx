import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { updateUser, getUserById } from '../api/users';
import { useAuth } from '../context/authContext';


import '../styles/editUserForm.css';

interface EditUserProps {
    value: string;
    onClose: () => void;
}
interface User {
    userId: string,
    userName: string,
    email: string,
    roleId: string,
    active: boolean,
}
const EditUserForm: React.FC<EditUserProps> = ({ value, onClose }) => {
    const { fetchUserList } = useAuth();
    const [user, setUser] = useState<User>();
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [roleId, setRoleId] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(value); // Assuming getUserById fetches user data by userId

                if (userData) {
                    setUser(userData);
                    setUserId(userData.userId);
                    setUserName(userData.userName);
                    setEmail(userData.email);
                    setRoleId(userData.roleId);
                    setActive(userData.active);
                }




            } catch (err) {
                console.log('Failed to fetch user data', err);
            }
        };

        fetchUserData();
    }, [value]);

    console.log(user);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = { userId, userName, email, roleId, active };

        try {
            await updateUser(updatedUser);
            await fetchUserList();
            onClose()
            setSuccessMessage('User updated successfully');
        } catch (err) {
            console.log('Failed to update user', err);
        }
    };

    return (
        <div className="update_user-form">
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
                        maxWidth: '500px',
                        gap: 3,
                    }}
                >
                    <h2 className="form-heading">Update User</h2>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="User Id"
                                value={userId}
                                fullWidth
                                disabled
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.5)',
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
                        <FormControl component="fieldset" sx={{ mb: 4 }} className="radio-button">
                            <RadioGroup
                                row
                                value={active ? 'true' : 'false'}
                                onChange={e => setActive(e.target.value === 'true')}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Active" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 4 }} />
                                <FormControlLabel value="false" control={<Radio />} label="Inactive" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.5)' }} />
                            </RadioGroup>
                        </FormControl>
                        <div className="form-button">
                            <Button variant="outlined" color="secondary" type="submit" sx={{ color: 'blue', borderColor: 'blue', backdropFilter: 'blur(10px)', borderRadius: '8px' }} >
                                Update User
                            </Button>
                            <Button variant="outlined" sx={{ color: 'red', borderColor: 'red', backdropFilter: 'blur(10px)', borderRadius: '8px' }} onClick={onClose}>Close</Button>
                        </div>
                    </form>

                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </Box>
            </React.Fragment>
        </div>
    )
}

export default EditUserForm