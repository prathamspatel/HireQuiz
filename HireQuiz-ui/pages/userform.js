// pages\userform.js
// Created by: Pratham
// Last Updated by: Pratham on 03/08/2023


import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
//import React from 'react';
import UserConfirmation from './user_confirmation';

export default function UserForm() {
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form data:', data);

    
      reset();

      setShowConfirmation(true);
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  return (
    <>
    {showConfirmation? (
      <UserConfirmation /> ) : (

     
    <form className="form-label font-weight-bold fs-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name:
        </label>
        <input type="text" className="form-control" {...register('firstName', { required: 'First name is required' })} />
        {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input type="text" className="form-control" {...register('lastName', { required: 'Last name is required' })} />
        {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address:
        </label>
        <input type="email" className="form-control" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="contactNo" className="form-label">
          Contact No:
        </label>
        <input type="tel" className="form-control" {...register('contactNo', { required: 'Contact number is required' })} />
        {errors.contactNo && <span className="text-danger">{errors.contactNo.message}</span>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="resume" className="form-label">
          Resume (PDF or DOCX):
        </label>
        <input type="file" className="form-control" {...register('resume', { required: 'Resume is required' })} />
        {errors.resume && <span className="text-danger">{errors.resume.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="coverLetter" className="form-label">
          Cover Letter (PDF or DOCX):
        </label>
        <input type="file" className="form-control" {...register('coverLetter', { required: 'Cover letter is required' })} />
        {errors.coverLetter && <span className="text-danger">{errors.coverLetter.message}</span>}
      </div>

      
      <button type="submit" className="btn btn-primary">Submit Application</button>
    </form>
     
     )}
     </>
  );
}
