import React from 'react';
import { AiFillGithub, AiOutlineHeart } from 'react-icons/ai';

export default function Footer({ iconColor }) {
    return (
        <div className="footerContainer">
            <a href="https://github.com/jain-kamal" target="_blank"><AiFillGithub size={30} color={iconColor} /></a>
            <div> Made with&nbsp;<AiOutlineHeart size={25} color={iconColor} />&nbsp;by Kamal.</div>
        </div>
    )
}