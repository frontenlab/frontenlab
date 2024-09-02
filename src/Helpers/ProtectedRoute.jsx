import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './SupabaseClient'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        return (
            <div style={{ padding: '20px' }}>
                {/* Skeleton for the Navbar */}
                <Skeleton height={50} width="100%" style={{ marginBottom: '20px' }} />
        
                {/* Skeleton for the Header or Hero Section */}
                <Skeleton height={200} width="100%" style={{ marginBottom: '20px' }} />
        
                {/* Skeleton for Main Content - Example with multiple cards or sections */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {Array(3).fill().map((_, index) => (
                    <div key={index} style={{ width: '30%', marginBottom: '20px' }}>
                        <Skeleton height={150} width="100%" style={{ marginBottom: '10px' }} />
                        <Skeleton count={2} />
                    </div>
                    ))}
                </div>
            </div>
        )
    }


  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoute