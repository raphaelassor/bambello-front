export const cloudinaryService = {
    uploadFile
}
function uploadFile(ev) {
    const CLOUD_NAME = 'dcwibf9o5'
    const PRESET_NAME = 'suhu9tpl'
    const UPLOAD_URL = 'http://res.cloudinary.com/peerce-llc/auto/upload/test.jpg';
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)

            return res
        })
        .catch(err => console.error(err))
}  