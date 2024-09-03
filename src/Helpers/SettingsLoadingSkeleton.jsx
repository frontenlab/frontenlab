import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const SettingsSkeleton = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Skeleton circle={true} height={80} width={80} />
        <Skeleton width={150} height={20} />
        <Skeleton width={`60%`} height={20} />
        <Skeleton width={`100%`} height={20} />
        <Skeleton width={`60%`} height={20} />
        <Skeleton width={100} height={40} />
    </div>
  );
};

export default SettingsSkeleton;
