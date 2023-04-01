import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComent, deleteComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('')
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const handleEdit = (e) => {
        e.preventDefault()
        if (text) {
            dispatch(editComent(postId, comment._id, text))
            setText('')
            setEdit(false)
        }
    }

    const handleDelete = () => {
        console.log(4856)
        dispatch(deleteComment(postId, comment._id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [uid, comment.commenterId])


    return (
        <div className='edit-comment'>
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src='./img/icons/edit.svg' alt='edit-comment' />
                </span>
            )}
            {isAuthor && edit && (
                <form onSubmit={handleEdit}
                    className='edit-comment-form'>
                    <label htmlFor='text' onClick={() => setEdit(!edit)}>Annuler</label>
                    <br />
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <br />
                    <div className='btn'>
                        <span onClick={() => {
                            if (window.confirm('voulez-vous supprimer ce commentaire?')) {
                                handleDelete()
                            }
                        }}>
                            <img src='./img/icons/trash.svg' alt='delete-comment' />
                        </span>
                        <input type='submit' value='valider modification' />
                    </div>

                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;