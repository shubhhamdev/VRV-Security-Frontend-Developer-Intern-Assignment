import { useState, useEffect } from "react";
import "../index.css";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";



const App = () => {
  // Function to fetch users from localStorage
  const getStoredUsers = () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  // Function to fetch theme from localStorage
  const getStoredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false; // Default to light theme (false)
  };

  // Initial users
  const initialUsers = [
    { id: 1, name: "Shubham", date: "2024-12-01", role: "Admin", permissions: ["Delete", "Read", "Write"], status: "Active" },
    { id: 2, name: "Aryan", date: "2024-12-02", role: "Admin", permissions: ["Delete", "Write"], status: "Inactive" },
    { id: 3, name: "Shaan", date: "2024-12-03", role: "User", permissions: ["Read", "Write"], status: "Active" },
  ];

  // States
  // States
const [users, setUsers] = useState(() => [...initialUsers, ...getStoredUsers()]);
const [dialogOpen, setDialogOpen] = useState(false);
const [formData, setFormData] = useState({ id: null, name: "", date: "", role: "User", status: "Active", permissions: [] });
const [editMode, setEditMode] = useState(false);
const [theme, setTheme] = useState(getStoredTheme);
const [errors, setErrors] = useState({}); // Initialize errors state


  const permissionsList = ["Read", "Write", "Delete"];

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    const localUsers = users.filter(user => user.id > initialUsers.length);
    localStorage.setItem("users", JSON.stringify(localUsers));
  }, [users]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Toggle theme
  const handleThemeToggle = () => setTheme(prev => !prev);

  // Open dialog
  const handleDialogOpen = (user = null) => {
    setEditMode(!!user);
    setFormData(user || { id: null, name: "", date: "", role: "User", status: "Active", permissions: [] });
    setDialogOpen(true);
  };

  // Close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ id: null, name: "", date: "", role: "User", status: "Active", permissions: [] });
    setErrors({}); // Clear errors
  };
  

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle permissions
  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      const permissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions };
    });
  };

  // Save new user or update existing user
 // Save new user or update existing user
const handleSave = () => {
    // Validation logic
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.role) newErrors.role = "Role is required.";
  
    setErrors(newErrors); // Set errors to the state
    if (Object.keys(newErrors).length > 0) return; // Stop if there are validation errors
  
    if (editMode) {
      setUsers(prev => prev.map(user => user.id === formData.id ? formData : user));
    } else {
      setUsers(prev => [...prev, { ...formData, id: users.length + 1 }]);
    }
    handleDialogClose();
  };
  

  // Delete user
  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Style for status badge
  const getStatusStyle = (status) => ({
    color: status === "Active" ? "#00FF00" : "#FF4D4D",
    borderColor: status === "Active" ? "#00FF00" : "#FF4D4D",
  });

  return (
    <div className={`app-container ${theme ? "dark-theme" : "light-theme"}`}>
      {/* Header */}
      <header className="header">
        <h1>Admin Dashboard</h1>
        <Button className="add-user-button" variant="contained" onClick={() => handleDialogOpen()}>
          Add User
        </Button>
        <FormControlLabel control={<Switch checked={theme} onChange={handleThemeToggle} />} label="Dark Mode" />
      </header>

      {/* Table */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header-row">
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="table-row">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className="status-indicator" style={getStatusStyle(user.status)}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {user.permissions.map((perm, index) => (
                    <span key={index} className="permission-chip">{perm}</span>
                  ))}
                </TableCell>
                <TableCell>
                  <Button className="edit-button" variant="outlined" size="small" onClick={() => handleDialogOpen(user)}>Edit</Button>
                  <Button className="delete-button" variant="outlined" size="small" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
 <Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      fullWidth
      error={!!errors.name}
      helperText={errors.name}
    />
    <TextField
      margin="dense"
      label="Date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      error={!!errors.date}
      helperText={errors.date}
    />
    <TextField
      margin="dense"
      label="Role"
      name="role"
      value={formData.role}
      onChange={handleChange}
      select
      fullWidth
      error={!!errors.role}
      helperText={errors.role}
    >
      <MenuItem value="Admin">Admin</MenuItem>
      <MenuItem value="User">User</MenuItem>
    </TextField>
    <TextField
      margin="dense"
      label="Status"
      name="status"
      value={formData.status}
      onChange={handleChange}
      select
      fullWidth
    >
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Inactive">Inactive</MenuItem>
    </TextField>

    <FormGroup>
      {permissionsList.map((perm) => (
        <FormControlLabel
          key={perm}
          control={<Checkbox checked={formData.permissions.includes(perm)} onChange={() => handlePermissionChange(perm)} />}
          label={perm}
        />
      ))}
    </FormGroup>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleSave}>{editMode ? "Save" : "Add"}</Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default App;
