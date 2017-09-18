import React, { Component } from 'react';
import style from 'css/footer.scss';

export default ({right}) => {
    return (
        <div className={style.footer}>
            <p>Copyright &copy; 2017 <a 
                target="_blank" 
                href="http://bcc.ptiik.ub.ac.id/"
                className="footer-link"
            >Basic Computing Community</a>. All rights reserved</p>
        </div>
    );
}