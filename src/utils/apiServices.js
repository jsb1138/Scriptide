import axios from 'axios'
import { toast } from 'react-toastify'
import { useScriptideContext } from '../contexts/ScriptideProvider';

export function showSuccessToast (message) {
  toast.success(message || 'Compiled Successfuly', {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
}

export function showErrorToast (message) {
  toast.error(message || "Compile Failed", {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

