import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPicture } from '../../actions/user.actions';

const UploadPic = () => {
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)

    const handlePicture = () => {
        const data = new FormData()
        data.append("name", userData.pseudo)
        data.append("userId", userData._id)
        const fileInput = document.getElementById('file');
        const defaultText = fileInput.getAttribute('data-default');
        data.append("file", file)

        dispatch(UploadPicture(data, userData._id))
    }

    return (
        <form action="" onSubmit={handlePicture} className='upload-pic'>
            <label htmlFor='file'>changer d'image</label>
            <input color="transparent" type='file' id='file' name='file' accept='.jpeg, .jpg, .png' onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <input type='submit' value="envoyer" />
        </form>
    );
};

export default UploadPic;