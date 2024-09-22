import React, { useEffect, useState } from 'react';
import { supabase } from '../Helpers/SupabaseClient';

const Login = ({ name, class_name }) => {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGithubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });

        
        
        if (error) {
            console.log("Error logging in with GitHub:", error.message);
        } else {
            setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
        }
        

    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                // Set the user session in the state if needed
                const user = session.user;

                // Fetch current user data to check the name
                const { data: existingUser, error: fetchError } = await supabase
                    .from('users')
                    .select('name')
                    .eq('id', user.id)
                    .maybeSingle();

                if (fetchError) {
                    console.error('Error fetching user data:', fetchError);
                } else {
                    // Update name only if it's empty
                    const nameToUpdate = existingUser?.name || '';
                    const updatedName = nameToUpdate ? nameToUpdate : user.user_metadata?.user_name || '';

                    const { error } = await supabase.rpc('upsert_user', {
                        p_id: user.id,
                        p_username: user.user_metadata?.user_name || '',
                        p_name: updatedName,
                        p_email: user.email,
                        p_avatar_url: user.user_metadata?.avatar_url || '',
                    });


                    if (error) {
                        console.error('Error storing user info:', error);
                    }
                }
            } else {
                // Handle case when user is not logged in
                console.log("No session found");
            }
            setLoading(false);
        };

        fetchUser();
        
    }, [isLoggedIn]); 
    return (
        <div>
            <button className={`${class_name}`} onClick={handleGithubLogin} disabled={loading}>
                {loading ? 'Loading...' : name}
            </button>
        </div>
    );
};

export default Login;
