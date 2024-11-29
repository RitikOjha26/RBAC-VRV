import { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdAddModerator } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRole } from '../context/rolescontext'
import { useAuth } from '../context/authContext'
import { deleteRole } from '../api/roles';
import SIDENAV from '../components/sideNav'
import ADDROLEFORM from '../components/addRoleForm';
import EditRoleForm from '../components/editRoleForm';
import Particles from '../components/particles';
import '../styles/roles.css'

interface Feature {
  featureName: string;
  access: "WRITE" | "READ" | "NO_ACCESS";
}

interface Role {
  roleId: string;
  roleName: string;
  features: Feature[];
}
const Roles = () => {

  const { user } = useAuth();
  const { role, rolesList, fetchRolesList } = useRole();
  const [selectedRoleId , setSelectedRoleId] = useState<string>("");
  const [currentRoleId , setCurrentRoleId] = useState<string>("");
  const [writeAccess, setWriteAccess] = useState<boolean>(false);
  const [noAccess, setNoAccess] = useState<boolean>(false);
  const [showAddRoleForm, setShowAddRoleForm] = useState<boolean>(false);
  const [showEditRoleForm, setShowEditRoleForm] = useState<boolean>(false);
  
  const [isMobileNavVisible, setMobileNavVisisble] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user || !role) {
        throw new Error("User Data Not Fetched")
        
      }

      if(role) {
        setCurrentRoleId(role.roleId);
      }

      const hasRolesPageAccess = role.features.some(
        feature => feature.featureName === "Roles Page" && (feature.access === "READ" || feature.access === "WRITE")
      );

      if (!hasRolesPageAccess) {
        setNoAccess(true);
        return;
      }

      const hasEditAccess = role.features.some(
        feature => feature.featureName === "Roles Page" && feature.access === "WRITE"
      );

      if (hasEditAccess) {
        setWriteAccess(true);
      }

      try {
        await fetchRolesList();
      }
      catch (error) {
        console.log("Error Featching Data", error);
       
      }

    }
    fetchRoles();
  }, [role, user]);

  const handleAddRoleClick = () => setShowAddRoleForm(true);

  const handleCloseRoleForm = () => {
    setShowAddRoleForm(false);
    setShowEditRoleForm(false);
  }

  const handleUserRoleEdit = (Id: string ) => {
    setSelectedRoleId(Id)
    setShowEditRoleForm(true);

  }

  const handleDeleteRole = async ( id:string ) =>{

    const response = await deleteRole(id);

    await fetchRolesList();
    return response;
  }

  const handleNavtoggle = () => {
    setMobileNavVisisble(!isMobileNavVisible);
}

console.log(showEditRoleForm);

  return (
    <div className='roles-page'>
      <Particles/>
      {window.innerWidth <= 768?<SIDENAV className={` nav ${isMobileNavVisible ? "mobile-visible" : "mobile-hidden"}`}/> : <SIDENAV/> }
      
      <div className="roles-container">
      {window.innerWidth <= 768 ? <FaSlidersH size="1em" className='mobile-sidenav nav-icon ' onClick={handleNavtoggle}/> : '' }
      <div className="heading">
      
        <h2>Roles Manangement</h2>
        {writeAccess && <button className='add-user' onClick={handleAddRoleClick} ><MdAddModerator size="2em" style={{ marginRight: "5px" }}  /> {window.innerWidth <= 768 ?<h3>Add Roles</h3> : ""}</button>}
      </div>

      {showAddRoleForm && (
        <div className="">
          <ADDROLEFORM onClose={handleCloseRoleForm} />
        </div>
      )}

      {showEditRoleForm && (
        <div className="">
          <EditRoleForm value={selectedRoleId} onClose={handleCloseRoleForm} />
        </div>
      )}

      <TableContainer component={Paper} className="table"
        sx={{
          background: "transparent", // Remove background
          color: "rgba(0, 0, 0, 0.87)",
          boxShadow: "var(--Paper-shadow)", // Keep the box-shadow as is
          borderRadius: "4px",
          overflowX: "auto",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead

          >
            <TableRow
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
              }}
            >
              <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >Role ID</TableCell>
              <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >Role Name</TableCell>
              <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >Role Management</TableCell>

              <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >User Management</TableCell>
              {writeAccess !== false ? <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >Edit</TableCell> : ''}
              {writeAccess !== false ? <TableCell className="tableCell"
                sx={{
                  padding: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >Delete</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {noAccess === false ? (
              rolesList && rolesList.length > 0 ? (
                rolesList.map((cell: Role) => {

                  const rolePageAccess = cell.features.find(
                    (feature) => feature.featureName === "Roles Page"
                  )?.access || "No Access";
                  const userPageAccess = cell.features.find(
                    (feature) => feature.featureName === "User Management"
                  )?.access || "No Access";

                  return (
                    <TableRow
                      key={cell.roleId}
                      sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        color: "grey",
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        className="tableCell"
                        sx={{
                          padding: "10px",
                          color: "grey",
                          textAlign: "center",
                          display: { xs: "none", sm: "table-cell" },
                        }}
                      >
                        {cell.roleId}
                      </TableCell>
                      <TableCell
                        className="tableCell"
                        sx={{ padding: "10px", color: "grey", textAlign: "center" }}
                      >
                        {cell.roleName}
                      </TableCell>
                      <TableCell
                        className="tableCell"
                        sx={{ padding: "10px", color: "grey", textAlign: "center" }}
                      >
                        {rolePageAccess}
                      </TableCell>
                      <TableCell
                        className="tableCell"
                        sx={{ padding: "10px", color: "grey", textAlign: "center" }}
                      >
                        {userPageAccess}
                      </TableCell>

                      {writeAccess && (
                        <>
                          <TableCell
                            className="tableCell"
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            <button className="user-edit">
                              <FaEdit size="1.2em" style={{ color: "#0096FF" }} onClick={() => handleUserRoleEdit(cell.roleId)} />
                            </button>
                          </TableCell>
                          <TableCell
                            className="tableCell"
                            sx={{ textAlign: "center" }}
                          >
                            { currentRoleId !== cell.roleId ? <button className="user-delete" onClick={()=> handleDeleteRole(cell.roleId)}>
                              <MdDelete size="1.2em" />
                            </button> : ""}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={writeAccess ? 6 : 5}
                    className="tableCell"
                    sx={{ padding: "10px", color: "grey", textAlign: "center" }}
                  >
                    No Role Found
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={writeAccess ? 6 : 5}
                  className="tableCell"
                  sx={{ padding: "10px", color: "grey", textAlign: "center" }}
                >
                  No Role Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>


        </Table>
      </TableContainer>
      </div>
    </div>
  )
}

export default Roles