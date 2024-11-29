import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { useRole } from '../context/rolescontext';
import { updateRole, getRolesById  } from '../api/roles';
import '../styles/editRoleForm.css';

interface EditUserProps {
    value: string;
    onClose: () => void;
}

interface Feature {
    featureName: string;
    access: "WRITE" | "READ" | "NO_ACCESS";
}

interface Role {
    roleId: string;
    roleName: string;
    features: Feature[];
}


const EditRoleForm: React.FC<EditUserProps> = ({ value, onClose }) => {

    const { fetchRolesList } = useRole();
    const [roleId, setRoleId] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const [features, setFeatures] = useState<Feature[]>([])
    const [roleFeature, setRoleFeature] = useState<Feature>({
        featureName: "Roles Page",
        access: "NO_ACCESS",
    });
    const [userPageFeature, setUserPageFeature] = useState<Feature>({
        featureName: "User Management",
        access: "NO_ACCESS",
    });

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getRolesById(value);

                setRoleId(userData.roleId);
                setRoleName(userData.roleName);
                setFeatures(userData.features);
                setRoleFeature(features[0]);
                setUserPageFeature(features[1]);


            } catch (err) {
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, [value ]);

    console.log("This is role Feature",roleFeature);
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFeatures([roleFeature , userPageFeature]);
        const updatedUser = { roleId, roleName , features };
        
        try {
            await updateRole(updatedUser);  
            await fetchRolesList();
            onClose()
            setSuccessMessage('User updated successfully');
        } catch (err) {
            setError('Failed to update user');
        }
    };


    return (
        <div className="role-editform">
      <React.Fragment>
        
        <Box
          sx={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <form onSubmit={handleSubmit}

          >
            <h2 className='form-heading'>Edit Role</h2>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
                onChange={e => setRoleName(e.target.value)}
                value={roleName}
                fullWidth
                required
                sx={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                }}
              />
            </Stack>

            <FormControl component="fieldset" sx={{ mb: 4 }} className="radio-button">
              <FormLabel component="legend" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                Roles Page
              </FormLabel>

              <RadioGroup
                row
                value={roleFeature.access}
                onChange={(e) =>
                  setRoleFeature({
                    featureName: "Roles Page",
                    access: e.target.value as "WRITE" | "READ" | "NO_ACCESS",
                  })
                }
              >
                <FormControlLabel
                  value="WRITE"
                  control={<Radio />}
                  label="Write"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    mb: 4,
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
                <FormControlLabel
                  value="READ"
                  control={<Radio />}
                  label="Read"
                  sx={{
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
                <FormControlLabel
                  value="NO_ACCESS"
                  control={<Radio />}
                  label="No Access"
                  sx={{
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
              </RadioGroup>
            </FormControl>


            <FormControl component="fieldset" sx={{ mb: 4 }} className="radio-button">
              <FormLabel component="legend" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                User Management Page
              </FormLabel>

              <RadioGroup
                row
                value={userPageFeature.access}
                onChange={(e) =>{
                  
                  setUserPageFeature({
                    
                    featureName: "User Management",
                    access: e.target.value as "WRITE" | "READ" | "NO_ACCESS",
                  });
                  console.log(e.target.value);}
                }
              >
                <FormControlLabel
                  value= {"WRITE"}
                  control={<Radio />}
                  label="Write"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    mb: 4,
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
                <FormControlLabel
                value={"READ"}
                  control={<Radio />}
                  label="Read"
                  sx={{
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
                <FormControlLabel
                value={"NO_ACCESS"}
                  control={<Radio />}
                  label="No Access"
                  sx={{
                    mb: 4,
                    color: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    paddingRight: '10px',
                  }}
                />
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
              >Add Role</Button>
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
    )
}

export default EditRoleForm