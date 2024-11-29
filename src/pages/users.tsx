import { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaSlidersH } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from '../context/authContext';
import { useRole } from '../context/rolescontext';
import { deleteUser } from '../api/users';
import SIDENAV from '../components/sideNav'
import USERFORM from '../components/addUserForm';
import EDITFORM from '../components/editUserForm';
import Particles from '../components/particles'
import '../styles/users.css';


interface User {
  userId: string;
  userName: string;
  email: string;
  roleId: string;
  active: boolean;
}

const Users = () => {
  
  const { user, userList, fetchUserList } = useAuth();
  const { role } = useRole();
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [writeAccess, setWriteAccess] = useState<boolean>(false);
  const [noAccess, setNoAccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userDataUpdated, setUserDataUpdated] = useState(false);
  const [selectedUsedId, setSelectedUserId] = useState<string>("");
  const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false);
  const [isMobileNavVisible, setMobileNavVisisble] = useState<boolean>(true);
  const [isMobile , setIsMobile] = useState<boolean>(false)
  

  useEffect(() => {
    const fetchUsers = async () => {
     
      if (!role) {
        setError("Role information not available.");
        return;
      }
      console.log(user);
      if (user) {
        setCurrentUserId(user.userId);

      }

      // Check for the "User Management" feature access
      const hasUserPageAccess = role.features.some(
        feature =>
          feature.featureName === "User Management" &&
          (feature.access === "READ" || feature.access === "WRITE")
      );

      if (!hasUserPageAccess) {
        // setError("You do not have access to view users.");
        setNoAccess(true);
        return;
      }

      const hasEditAccess = role.features.some(
        feature => feature.featureName === "User Management" && feature.access === "WRITE"
      );

      if (hasEditAccess) {
        setWriteAccess(true);
      }

      function handleResize() {
        setIsMobile(window.innerWidth <= 768);
      }
  
      
      window.addEventListener("resize", handleResize);
  
      handleResize();
  
     
     


      try {

        await fetchUserList();
        // const users = await getAllUsers();


      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      }
    };


    fetchUsers();
  }, [user, role, userDataUpdated , isMobile]);

  console.log("Context is updated", userList);

  const handleAddUserClick = () => setShowUserForm(true);
  const handleCloseUserForm = () => {
    setShowUserForm(false);
    setShowEditUserForm(false);
  }

  const handleUserDataUpdated = () => {
    setUserDataUpdated(prevState => !prevState);
  };

  const handleUserDataEdit = (userId: string) => {
    setSelectedUserId(userId);
    setShowEditUserForm(true);

  }

  const handleNavtoggle = () => {
    setMobileNavVisisble(!isMobileNavVisible);
  }

  const handleUserDelete = async (userId: string) => {

    const response = await deleteUser(userId);
    await fetchUserList();

    return response;

  }

  



  if (error) {
    return <div className="error">{error}</div>;
  }



  return (
    <div className={`users-page ${showUserForm ? 'blurred' : ''}`}>
      <Particles />
      {window.innerWidth <= 768 ? <SIDENAV className={` nav ${isMobileNavVisible ? "mobile-visible" : "mobile-hidden"}`} /> : <SIDENAV />}
     

      <div className="userlist-container">
      {window.innerWidth <= 768 ? <FaSlidersH size="1em" className='mobile-sidenav nav-icon ' onClick={handleNavtoggle}/> :  '' }
        <div className="heading">
          <h2>User Management</h2>

          {writeAccess &&<button className="add-user" onClick={handleAddUserClick} ><FaAddressBook size="2em" style={{ marginRight: "5px" }} />{window.innerWidth <= 768 ?<h3>Add User</h3> : ""}</button>}
        </div>

        {showUserForm && (
          <div className="">
            <USERFORM onClose={handleCloseUserForm} onUserDataUpdated={handleUserDataUpdated} />
          </div>
        )}
        {showEditUserForm && (
          <div className="">
            <EDITFORM onClose={handleCloseUserForm} value={selectedUsedId} />
          </div>
        )}
        {/* <USERFORM onClose={handleCloseUserForm} onUserDataUpdated={handleUserDataUpdated} /> */}
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
                >User ID</TableCell>
                <TableCell className="tableCell"
                  sx={{
                    padding: "10px",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >User Name</TableCell>
                <TableCell className="tableCell"
                  sx={{
                    padding: "10px",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >Email</TableCell>
                <TableCell className="tableCell"
                  sx={{
                    padding: "10px",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    display: { xs: 'none', sm: 'table-cell' },
                  }}
                >RoleId</TableCell>
                <TableCell className="tableCell"
                  sx={{
                    padding: "10px",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >Active</TableCell>
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
                userList && userList.length > 0 ? (
                  userList.map((cell: User) => (
                    <TableRow key={cell.userId} sx={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                      borderRadius: "12px",

                      color: "grey",
                      cursor: "pointer",
                    }}>
                      <TableCell className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center", display: { xs: 'none', sm: 'table-cell' }, }}>
                        {cell.userId}
                      </TableCell>
                      <TableCell className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center" }}>
                        {cell.userName}
                      </TableCell>
                      <TableCell className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center" }}>
                        {cell.email}
                      </TableCell>
                      <TableCell className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center", display: { xs: 'none', sm: 'table-cell' }, }}>
                        {cell.roleId}
                      </TableCell>
                      <TableCell className="tableCell" sx={{ width: "auto", padding: "10px", color: "grey", textAlign: "center" }}>
                        <span className={`status ${cell.active ? 'active' : 'inactive'}`}>
                          {cell.active ? "Active" : "Not Active"}
                        </span>
                      </TableCell>
                      {writeAccess && (
                        <>
                          <TableCell className="tableCell" sx={{ color: "white", textAlign: "center" }}>
                            <button className="user-edit"><FaEdit size="1.2em" style={{ color: '#0096FF' }} onClick={() => handleUserDataEdit(cell.userId)} /></button>
                          </TableCell>
                          <TableCell className="tableCell  " sx={{ textAlign: "center", }}>
                            {currentUserId !== cell.userId ? <button className="user-delete " onClick={() => handleUserDelete(cell.userId)} ><MdDelete size="1.2em" /></button> : ''}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={writeAccess ? 8 : 6} className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center" }}>
                      No User Found
                    </TableCell>
                  </TableRow>
                )
              ) : <TableRow>
                <TableCell colSpan={writeAccess ? 8 : 6} className="tableCell" sx={{ padding: "10px", color: "grey", textAlign: "center" }}>
                  No User Found
                </TableCell>
              </TableRow>}
            </TableBody>

          </Table>
        </TableContainer>
        </div>
      </div>
      );
};

      export default Users;
