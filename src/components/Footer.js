import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

export default function Footer() {
    return (
        <div className="footerContainer">
            <a href="https://github.com/jain-kamal" target="_blank"><AiFillGithub size={30} color='black'/></a>
            <span> © by Kamal. All rights reserved.</span>
        </div>
    )
}