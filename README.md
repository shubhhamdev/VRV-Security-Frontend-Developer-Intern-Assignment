# Role-Based Access Control (RBAC) UI

This project is a responsive **Admin Dashboard** built with **React** and **Vite**, featuring a dark and light mode toggle, user management functionalities, and persistent state using `localStorage`.

## Features
- **Add, Edit, and Delete Users**:
  Manage users with fields like name, role, date, permissions, and status.
  
- **Dynamic Theme Toggle**:
  Switch between **Light Mode** and **Dark Mode**, with the selected theme persisting across page reloads.

- **LocalStorage Integration**:
  - Newly added or edited users are stored in the browser’s local storage.
  - Previously saved users and the selected theme are loaded on refresh.

## Technologies Used
- **React** for UI development
- **Vite** for a fast build tool and development server
- **Material-UI** for UI components and styling
- **CSS** for custom styling
- **LocalStorage** for data persistence

### CSS Highlights
- **Themed Styles**:
  - `.light-theme` and `.dark-theme` classes for global theme-based styles.
  - Separate styling for headers, tables, buttons, and status indicators in both themes.
- **Responsive Design**:
  - Styled components adapt for better usability across devices.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at the URL provided by Vite (e.g., [http://localhost:5173](http://localhost:5173)).

## Usage
1. **Manage Users**:
   - Click **"Add User"** to create a new user.
   - Use **Edit** or **Delete** buttons for existing users.

2. **Theme Toggle**:
   - Use the **Dark Mode** switch to toggle between light and dark themes.
   - The selected theme persists across sessions.

3. **Persistent Data**:
   - Any added or updated users are saved in local storage and reloaded on refresh.

## Screenshots

### Dark Mode
![Dark Mode Example](./assets/dark%20theme.jpg)

### Light Mode
![Light Mode Example](./assets/light%20theme.jpg)

## Customization
- **Themes**:
  Modify `.light-theme` and `.dark-theme` classes in `index.css` for personalized theme styling.

- **Permissions**:
  Update the `permissionsList` array in `App.jsx` to add or remove available permissions.

## Future Enhancements
- Add pagination for large user lists.
- Include user search functionality.
- Integrate with a backend for centralized data storage.
