import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonCard.css'

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <Skeleton height={180} width={300} />
            <div className="skeleton-text">
                <Skeleton height={20} width={180} />
                <Skeleton height={12} width={250} />
            </div>
        </div>
    );
};

export default SkeletonCard;