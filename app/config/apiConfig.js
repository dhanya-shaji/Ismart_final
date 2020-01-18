import urls from "./urlConfig";
// import RNFetchBlob from 'react-native-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob'

// import axios from "axios";

const baseUrl = urls.apiBaseUrl;

export function post(endPoint, reqData) {
  return fetch(baseUrl + endPoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
      // "Content-Type": "multipart/form-data"
    },
    body: reqData
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson, resultCode: 1 };
      } else {
        return { error: responseJson.data,response: responseJson , resultCode: 0};
      }
    })
    .catch(function(error) {
      console.log(error);
      return { error: "Some Error Occurred pls try again later ", resultCode: 0 };
    });
}
export function authorizePostFormData(endPoint, reqData,token) {
  return fetch(baseUrl + endPoint, {
    method: "POST",
    headers: {
      // 'Content-Type': 'application/json'
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+token
    },
    body: reqData
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson, resultCode: 1 };
      } else {
        return { error: responseJson , resultCode: 0};
      }
    })
    .catch(function(error) {
      return { error: error, resultCode: 0 };
    });
}
export function postLogin(endPoint, reqData) {
  return fetch(baseUrl + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: reqData
  })
    .then(response => response.json())
    .then(responseJson => {
      if (typeof responseJson.token === "undefined") {
        return { error: responseJson ,resultCode: 2};
      } else {
        return { error: responseJson, response: responseJson, resultCode: 1 };
      }
    })
    .catch(function(error) {
      return { error: error , resultCode: 3};
    });
}
export function get(endPoint) {

  // console.log('baseUrl is');
  // console.log(baseUrl);

  // console.log('endpoint is');
  // console.log(endPoint);
  console.log(baseUrl+endPoint,'API Response');
  return fetch(baseUrl + endPoint, { method: "GET" })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson, resultCode: 1 };
      } else {
        return { error: responseJson, response: responseJson, resultCode: 2 };
      }
    })
    .catch(function(error) {
      console.log(error,'ismart error')
      return { error:error, resultCode: 3 };
    });
}
export function authorizedGet(endPoint, reqData) {
  return fetch(baseUrl + endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+reqData.token
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson , resultCode: 1};
      } else {
        return { error: responseJson, response: responseJson , resultCode: 2};
      }
    })
    .catch(function(error) {
      console.log(error,'ismart error')
      return { error: error, resultCode: 3 };
    }); 
}
export function authorizedPost(endPoint, reqData) {
  return fetch(baseUrl + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": reqData.token
    },
    body: JSON.stringify({ reqData })
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson, resultCode: 1 };
      } else if (responseJson.resultCode === 0) {
        return { error: responseJson, resultCode: 2 };
      }
    })
    .catch(function(error) {
      console.log(error,'ismart error')
      return { error: error , resultCode: 3};
    });
}

export function getSample(endPoint) {
  return fetch(baseUrl + endPoint)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson , resultCode: 1};
      } else {
        return { error: responseJson, resultCode: 2 };
      }
    })
    .catch(function(error) {
      console.log(error,'ismart error')
      return { error: error, resultCode: 3 };
    });
}

// export function fileUpload(endPoint, reqData) {
//   axios
//     .post(baseUrl + endPoint, reqData)
//     .then(response => response.json())
//     .then(responseJson => {
//       if (responseJson.resultCode === 1) {
//         return { error: null, response: responseJson, resultCode: 1 };
//       } else {
//         return { error: responseJson, resultCode: 2 };
//       }
//     })
//     .catch(function(error) {
//       return { error: error, resultCode: 3 };
//     });
// }

export function fileUpload(endPoint, reqData) {
  console.log("reqData is", reqData);
  return RNFetchBlob.fetch('POST', baseUrl+endPoint, {
    "Content-Type": "multipart/form-data",
     
  },  [
    {  name: 'file', filename: reqData.fileName, type: 'image/jpeg', data: reqData.data },
   
  
    
  ])
  .then((resp) => {

    console.log("resp data is from file upload ", resp.data);

      var tempMSG = JSON.parse(resp.data);
      // var tempMSG = resp.data;

      // tempMSG = tempMSG.replace(/^"|"$/g, '');
      
     console.log("tempMSG is",tempMSG);
     return { error: null, response: {
      "data": tempMSG.data,
      "resultCode": tempMSG.resultCode,
      "message": "success",
      "error": ""
  } , resultCode: tempMSG.resultCode};
    }).catch((err) => {
      console.log(err,'errroorrr....')
      // ...
    })
}

export function postFileUpload(endPoint, reqData) {
  return fetch(baseUrl + endPoint, {
    method: "POST",
    headers: {
      // 'Content-Type': 'application/json'
      "Content-Type": "multipart/form-data"
    },
    body: reqData
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.resultCode === 1) {
        return { error: null, response: responseJson, resultCode: 1 };
      } else {
        return { error: responseJson , resultCode: 0};
      }
    })
    .catch(function(error) {
      return { error: error, resultCode: 0 };
    });
}
