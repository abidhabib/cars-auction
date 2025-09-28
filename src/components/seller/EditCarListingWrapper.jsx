// src/components/seller/EditCarListingWrapper.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditCarListing from './EditCarListing';

const EditCarListingWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    // Go back to detail view after editing
    navigate(`/Dashboard/inventory/${id}`);
  };

  return <EditCarListing id={parseInt(id)} onBack={handleBack} />;
};

export default EditCarListingWrapper;