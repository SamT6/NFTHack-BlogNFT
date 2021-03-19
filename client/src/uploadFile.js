const pinataApiKey = "8d8803ba03e16bd87221";
const pinataSecretApiKey = "fbec8fd8657e371c66f04d8cb2f42c8ffddceb6d165135d9b05144a4827b1ddd";
const axios = require("axios");
const FormData = require("form-data");
const uploadToIPFS = async ({author, title, url, timestamp}) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("author", author );
    data.append("title", title);
    data.append("url", url);
    data.append("timestamp", timestamp);
    const res = await axios.post(url, data, {
        maxContentLength: "Infinity", 
        headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey, 
        pinata_secret_api_key: pinataSecretApiKey,
        },
    });
    console.log(res.data);
};
uploadIPFS();