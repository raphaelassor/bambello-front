import React from 'react';
import Moment from 'react-moment';
import { ReactComponent as PaperClipIcon } from '../../assets/img/icons/paperclip-solid.svg'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'

export function CardAttachments({ attachs, onDeleteCardAttachment }) {
    console.log(attachs)
    return (
        <div className="card-attachments">
            <div className="window-modal-title flex align-center">
                <PaperClipIcon />
                <h3>Attachments</h3>
            </div>
            <div className="attachments-container">
                {attachs.map(attach => {
                    return <a target="_blank" href={attach.url} className="clean-link">
                        <div key={attach.id} className="attach-preview flex">
                            <div className="img-container">
                                <img src={attach.url} alt="" />
                            </div>
                            <div className="attach-content flex column full">
                                <span className="file-name">{attach.fileName} </span>
                                <div className="time-n-actions flex wrap align-center ">
                                    <Moment fromNow>{attach.createdAt}</Moment>
                                    <span>-</span>
                                    <button>Comment</button>
                                    <span>-</span>
                                    <button onClick={(ev) => onDeleteCardAttachment(ev,attach.id)}>Delete</button>
                                    <span>-</span>
                                    <button>Edit</button>
                                </div>
                                <span className="flex align-center"><VideoLabelIcon />Make cover</span>
                            </div>
                        </div>
                    </a>
                })}
            </div>
            <button className="secondary-btn">Add an attachment</button>
        </div>
    )
}