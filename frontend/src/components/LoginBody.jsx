import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LoginBody = () => {
    const [passwordVisibility, setPasswordVisibility] = useState({ isVisible: false, fieldType: "password", labelPrefix: "Show" })


    // Show/Hide password in the password field
    const togglePasswordVisibility = (e) => {
        const passwordField = document.getElementById("passwordInput");

        if (passwordVisibility.isVisible === true)
            setPasswordVisibility({ isVisible: false, fieldType: "password", labelPrefix: "Show" });
        else
            setPasswordVisibility({ isVisible: true, fieldType: "text", labelPrefix: "Hide" });
    }

    return (
        <div className='container my-3'>
            <h1>Login</h1>

            <form className='mt-3'>
                <div className="mb-3">
                    <label className='form-label fs-5' htmlFor="emailInput">Email Address</label>
                    <input className='form-control' type="text" name="email" id='emailInput' />
                </div>

                <div className="mb-2">
                    <label className='form-label fs-5' htmlFor="emailInput">Password</label>
                    <input className='form-control' type={passwordVisibility.fieldType} name="email" id='passwordInput' />
                </div>

                <div className="mb-3 form-check fs-5">
                    <input onClick={togglePasswordVisibility} className='form-check-input' type="checkbox" id='showHidePassword' value={passwordVisibility.isVisible} />
                    <label className='form-check-label' htmlFor="showHidePassword">{passwordVisibility.labelPrefix} Password</label>
                </div>

                <div className='my-4 text-center'>
                    <button className='btn btn-success btn-lg' type="submit">Login</button>
                </div>
                
            </form>

            <p className='text-center'>
                Don't have an account ?&nbsp;
                <Link className=" link-underline-primary" to="/signup">Signup</Link>
            </p>


        </div >


    )
}

export default LoginBody