import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, timestampParser } from '../Utils'
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';

const NewPostForm = () => {
    const [isloading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [postPicture, setPostPicture] = useState(null)
    const [video, setVideo] = useState("")
    const [file, setFile] = useState(null)
    const userData = useSelector((state) => state.user)
    //const error = useSelector((state) => state.error.postError);
    const dispatch = useDispatch()


    const handlePost = async (e) => {
        if (message || postPicture || video) {
            const data = new FormData()
            data.append('posterId', userData._id)
            data.append('message', message)
            if (file) data.append('file', file)
            if (video) data.append('video', video)

            await dispatch(addPost(data))
            dispatch(getPosts())
            cancelPost()
        } else alert('veuillez entrer un message')
    }

    const handlePicture = (e) => {
        console.log(e.target.files[0])
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        console.log(postPicture)
        setFile(e.target.files[0])
        setVideo('')
    }




    const cancelPost = () => {
        setMessage('')
        setPostPicture('')
        setVideo()
        setFile('')
    }

    useEffect(() => {
        const handleVideo = () => {
            let findlink = message.split(" ")
            for (let i = 0; i < findlink.length; i++) {
                if (findlink[i].includes('https://www.youtube') || findlink[i].includes('https://youtube')) {
                    let embed = findlink[i].replace('watch?v=', 'embed/')
                    setVideo(embed.split('&')[0])
                    findlink.splice(i, 1)
                    setMessage(findlink.join(" "))
                    setPostPicture("")
                }
            }

        }

        if (!isEmpty(userData)) setIsLoading(false)
        handleVideo()
    }, [userData, message])

    return (
        <div className='post-container'>
            {isloading ? (<FontAwesomeIcon icon={faSpinner} spin />) :
                (
                    <>
                        <div className='data'>
                            <p>
                                <span>{userData.following ? userData.following.length : 0}
                                </span> Abonnement{userData.following && userData.following.length !== 1 ? "s" : null}
                                <br />
                                <span>{userData.followers ? userData.followers.length : 0}
                                </span> Abonnés{userData.followers && userData.followers.length !== 1 ? "s" : null}
                            </p>
                        </div>

                        <div className='user-info'>
                            <NavLink exact to="profil">
                                <img src={userData.picture} alt="user-img" />
                            </NavLink>
                        </div>

                        <div className='post-form'>
                            <textarea
                                name='message'
                                id='message'
                                placeholder='quoi de neuf ?'
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            />
                            {message || postPicture || video ? (
                                <li className='card-container'>
                                    <div className='card-left'>
                                        <img src={userData.picture} alt="user-pic" />
                                    </div>
                                    <div className='card-right'>
                                        <div className='card-header'>
                                            <div className='pseudo'>
                                                <h3>{userData.pseudo}</h3>
                                            </div>
                                            <span>{timestampParser(Date.now())}</span>
                                        </div>
                                        <div className='content'>
                                            <p>{message}</p>
                                            {postPicture !== "" && <img src={postPicture} alt="post-pic"/>}
                                            {video && (
                                                <iframe
                                                    src={video}
                                                    allowFullScreen
                                                    allow="autoplay; clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                                                    title={video} />
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ) : null}
                            <div className='footer-form'>
                                <div className='icon'>
                                    {isEmpty(video) &&
                                        <>
                                            <img src="./img/icons/picture.svg" alt="img" />
                                            <input
                                                type="file"
                                                id="file-upload"
                                                name="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => handlePicture(e)}
                                            />
                                        </>
                                    }
                                    {video && (
                                        <button onClick={() => setVideo("")}>Supprimer Video</button>
                                    )}
                                </div>
                                <div className='btn-send'>
                                    {(message || postPicture || video) ? (<button className='cancel' onClick={cancelPost}>Annuler Message</button>) : null}
                                    <button className='send' onClick={handlePost}>Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
};

export default NewPostForm;



