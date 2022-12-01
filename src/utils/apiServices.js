import axios from 'axios'
import { toast } from 'react-toastify'
import { useScriptideContext } from '../contexts/ScriptideProvider';

// const submissions = import.meta.env.VITE_RAPIDAPI_SUBMISSIONS;
// const host = import.meta.env.VITE_RAPIDAPI_HOST;
// const key = import.meta.env.VITE_RAPIDAPI_KEY;

// const {
//   setProcessing,
//   language,
//   code,
//   setOutputDetails
// } = useScriptideContext();

// export function handleCompile() {
//     //@ts-ignore
//     setProcessing(true);
//     const formData = {
//       language_id: language.id,
//       source_code: btoa(code),
//       stdin: btoa(''),
//     };
//     console.log(formData);
//     const options = {
//       method: "POST",
//       url: submissions,
//       params: { base64_encoded: true, fields: "*" },
//       headers: {
//         "content-type": "application/json",
//         "Content-Type": "application/json",
//         "X-RapidAPI-Host": host,
//         "X-RapidAPI-KEY": key,
//       },
//       data: formData,
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log("res.data: ", response.data);
//         const token = response.data.token;
//         console.log("token: ", token);
//         checkStatus(token);
//       })
//       .catch((err) => {
//         console.log(options);
//         let error = err.response ? err.response.data : err;
//         //@ts-ignore
//         setProcessing(false);
//         console.log({ error });
//       });
//   }

//   async function checkStatus(token) {
//     const options = {
//       method: "GET",
//       url: submissions + "/" + token,
//       params: { base64_encoded: "true", fields: "*" },
//       headers: {
//         "X-RapidAPI-Host": host,
//         "X-RapidAPI-Key": key,
//       },
//     };
//     try {
//       let response = await axios.request(options);
//       let statusId = response.data.status?.id;

//       // Processed - we have a result
//       if (statusId === 1 || statusId === 2) {
//         // still processing
//         setTimeout(() => {
//           checkStatus(token);
//         }, 2000);
//         return;
//       } else {
//         //@ts-ignore
//         setProcessing(false);
//         setOutputDetails(response.data);
//         showSuccessToast(`Compiled Successfully!`);
//         console.log("response.data", response.data);
//         return;
//       }
//     } catch (err) {
//       console.log("err", err);
//       //@ts-ignore
//       setProcessing(false);
//       showErrorToast(err);
//     }
//   }

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

