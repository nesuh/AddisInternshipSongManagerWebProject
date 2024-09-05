// src/toast.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a custom toast configuration
const customToastConfig = {
  position: "top-right",
  autoClose: 5000, // Auto-close after 5 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Function to display success message
export const showSuccessToast = (message) => {
  toast.success(message, customToastConfig);
};

// Function to display error message
export const showErrorToast = (message) => {
  toast.error(message, customToastConfig);
};

// Function to display delete success message
export const showDeleteToast = (message) => {
    toast.info(message, customToastConfig); // Use 'info' for delete notifications
  };
// Export ToastContainer for usage in the app
export const ToastNotificationContainer = () => (
  <ToastContainer />
);
