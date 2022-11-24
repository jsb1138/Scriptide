import axios from 'axios'
import { toast } from 'react-toastify'

export function handleCompile () {
  //@ts-ignore
  setProcessing(true);
  const formData = {
    language_id: language.id,
    source_code: Buffer.from(code, 'base64'),
    stdin: Buffer.from(customInput, 'base64')
  };
  const options = {
    method: 'POST',
    url: process.env.RAPIDAPI_SUBMISSIONS,
    params: { base64_encoded: true, fields: '*'},
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      "X-RapidAPI-KEY": process.env.RAPIDAPI_KEY
    },
    data: formData
  }

  axios
    .request(options)
    .then(function (response) {
      console.log('res.data: ', response.data)
      const token = response.data.token
      console.log('token: ', token)
      checkStatus(token)
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      //@ts-ignore
      setProcessing(false);
      console.log(error);
    })
}

async function checkStatus (token) {
  const options = {
    method: "GET",
    url: sumbission + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": host,
      "X-RapidAPI-Key": key,
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token)
      }, 2000)
      return
    } else {
      setProcessing(false)
      setOutputDetails(response.data)
      showSuccessToast(`Compiled Successfully!`)
      console.log('response.data', response.data)
      return
    }
  } catch (err) {
    console.log("err", err);
    setProcessing(false);
    showErrorToast();
  }
}

function showSuccessToast (message) {
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

function showErrorToast (message) {
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

