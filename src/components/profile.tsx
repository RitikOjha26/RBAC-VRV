import React from 'react';
import '../styles/profile.css';

interface Props {
    name : string ;
    id: string ;
    email:string;
    roleName:string;
}
const profile : React.FC<Props> = ({ name, id , email , roleName }) => {
    return (


        <div className="outer-div">
            <div className="inner-div">
                <div className="front">
                    <div className="front__bkg-photo"></div>
                    <div className="front__face-photo"></div>
                    <div className="front__text">
                        <h3 >{name}</h3>
                        <p>{id}</p>

                        <span className="front__text-hover">{email}</span>
                    </div>
                </div>
                <div className="back">
                    <div className="social-media-wrapper">
                        <p>{roleName}</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default profile