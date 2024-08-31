import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './SupabaseClient'

const ProtectedRoute = () => {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const {data:{session}} = await supabase.auth.getSession();

            if(session) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

            setLoading(false);
        };
        checkAuth();
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }


  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoute