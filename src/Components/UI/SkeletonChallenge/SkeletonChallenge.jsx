import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import './SkeletonChallenge.css'

const SkeletonChallenge = () => {
    return (
        <div className="skeleton-challenge-page">
            <div className="skeleton-header">
                <Skeleton height={50} width={`100%`} />
            </div>
            <div className="skeleton-content">
                <Skeleton height={700} width="100%" />
            </div>
        </div>
    );
};

export default SkeletonChallenge;
