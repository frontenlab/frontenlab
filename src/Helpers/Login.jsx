import React, { useEffect, useState } from 'react';
import { supabase } from '../Helpers/SupabaseClient';
import { useAuth } from './AuthContext';

const Login = ({ name, class_name }) => {
    const [loading, setLoading] = useState(false);
    const { setIsLoggedIn } = useAuth();

    // const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;

    const handleGithubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: process.env.REACT_APP_SUPABASE_REDIRECT_URL,
                prompt: 'login',
            },
        });

        
        
        if (error) {
            console.log("Error logging in with GitHub:", error.message);
        } else {
            setIsLoggedIn(true); 
        }
        

    };

    useEffect(() => {
        const fetchUser = async () => {
          setLoading(true);
          const { data: { session } } = await supabase.auth.getSession();
      
          if (session) {
            const user = session.user;
      
            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('name, points, submission') 
              .eq('id', user.id)
              .maybeSingle();
      
            if (fetchError) {
              console.error('Error fetching user data:', fetchError);
            } else {
              const nameToUpdate = existingUser?.name || '';
              const updatedName = nameToUpdate ? nameToUpdate : user.user_metadata?.user_name || '';
      
              const points = existingUser?.points || 0;
              const submission = existingUser?.submission || 0;
      
              const { error } = await supabase.rpc('upsert_user', {
                p_id: user.id,
                p_username: user.user_metadata?.user_name || '',
                p_name: updatedName,
                p_email: user.email,
                p_avatar_url: user.user_metadata?.avatar_url || '',
                p_points: points, 
                p_submission: submission 
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
      }, []);
      
    return (
        <div>
            <button className={`${class_name}`} onClick={handleGithubLogin} disabled={loading}>
                {loading ? 'Loading...' : name}
            </button>
        </div>
    );
};

export default Login;
