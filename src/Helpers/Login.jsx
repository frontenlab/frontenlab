import React from 'react';
import { supabase } from '../Helpers/SupabaseClient';


const Login = ({name, class_name}) => {


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
            <button className={`${class_name}`} onClick={handleGithubLogin}>{name}</button>
        </div>
    )
}

export default Login;