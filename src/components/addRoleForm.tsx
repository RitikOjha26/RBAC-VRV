import React, { useState } from 'react';
import { TextField, Button, Stack, FormControl, RadioGroup, FormControlLabel, Radio, Box, FormLabel } from '@mui/material';
import { useRole } from '../context/rolescontext';
import { addRole } from '../api/roles';
import '../styles/addRoleForm.css';

interface AddRoleProps {
  onClose: () => void;

}
interface Feature {
  featureName: string;
  access: "WRITE" | "READ" | "NO_ACCESS";
}

const AddRole: React.FC<AddRoleProps> = ({ onClose }) => {
  const { fetchRolesList } = useRole();
  const [roleId, setRoleId] = useState<string>('');
  const [roleName, setRoleName] = useState<string>('');
  const [features, setFeatures] = useState<Feature[]>()
  const [roleFeature, setRoleFeature] = useState<Feature>({
    featureName: "Roles Page",
    access: "NO_ACCESS",
  });
  const [userPageFeature, setUserPageFeature] = useState<Feature>({
    featureName: "User Management",
    access: "NO_ACCESS",
  });
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cumulativeFeature = [roleFeature, userPageFeature];
      setFeatures([roleFeature, userPageFeature]);
      console.log(features);
      const newRole = { roleId, roleName, features: cumulativeFeature };
      console.log("This is the new Rolee" ,roleFeature);
      const addedUser = await addRole(newRole);
      console.log(addedUser)

      await fetchRolesList();
      onClose();
    } catch (err: any) {
      console.log("Error Adding New Role ", err);
      
    }
  };

  return (
    <div className="role-form">
      <React.Fragment>
        
        <Box
          sx={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth:'600px',
            gap: 1,
          }}
        >
          <form onSubmit={handleSubmit}

          >
            <h2 className='form-heading'>Add Role</h2>
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

            <FormControl component="fieldset" sx={{ mb: 2 , ml:2 }} className="radio-button">
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


            <FormControl component="fieldset" sx={{ mb: 2 , ml:2 }} className="radio-button">
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

export default AddRole