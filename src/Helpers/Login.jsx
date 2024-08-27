import React from 'react';
import { supabase } from '../Helpers/SupabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleGithubLogin = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/my`
            },
        });

        if (error) {
            console.log("Error Login in with Github:", error.message)
        } 
    }

    return (
        <div>
            <button className="Navbar-button" onClick={handleGithubLogin}>Login</button>
        </div>
    )
}

export default Login;