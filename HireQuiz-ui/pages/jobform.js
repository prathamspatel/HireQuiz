// pages\jobform.js
// Created by: Nirav
// Last Updated by: Nirav on July 20
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { getUser } from '../lib/auth';
import { postFragments } from './api';
import jobposting from './jobposting';


export default function UserForm() {

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({
    defaultValues: {
      job_title: '',
      email: '',
      qualification: [],
      job_description: '',
      Graduate: false
    }
  });


  useEffect(() => {
    let data = {
      job_title: '',
      company_name: '',
      email: '',
      qualification: [],
      job_description: '',
      Graduate: false
    };

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, []);



  async function submitForm(data) {
    // debugger
    try {
      console.log(data);
      const user = await getUser();
      const tmp = await postFragments(user, data);
      console.log("I am here tmp", tmp); // Verify the value of postings

      const headerurl = tmp.posting.id;
      console.log("I am here headerurl", headerurl); // Verify the value of postings

      const res = await fetch(`http://ec2co-ecsel-1ba9i1m8o403i-580755584.us-east-1.elb.amazonaws.com:8080/v1/posting/${headerurl}`, {
        method: "GET",
        headers: user.authorizationHeaders(),
      });
      data = await res.text();
      console.log("Got user fragments data", { data });
    } catch (error) {
      console.log({ error });
      // window.location.href = "/jobposting";

    }
  }

  return (

    <form className="form-label font-weight-bold fs-4" onSubmit={handleSubmit(submitForm)}>
      <div className="mb-3">
        <label htmlFor="job_title" className="form-label">
          Job Title:
        </label>
        <input type="text" className="form-control" {...register('job_title', { required: 'Job title is required' })} />
        {errors.job_title && <span className="text-danger">{errors.job_title.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="company_name" className="form-label">
          Company Name:
        </label>
        <textarea className="form-control" {...register('company_name', { required: 'Company name is required' })}></textarea>
        {errors.company_name && <span className="text-danger">{errors.company_name.message}</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input type="email" className="form-control" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Qualification:</label>
        <select multiple className="form-select" {...register('qualification', { required: 'Qualification is required' })}>
          <option value="DAD">Database Application Developer</option>
          <option value="CPA">Computer Programming &amp; Analysis</option>
          <option value="CPP">Computer Programming</option>
          <option value="DSA">Honours Bachelor of Data Science and Analytics</option>
        </select>
        {errors.qualification && <span className="text-danger">{errors.qualification.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Job Description:</label>
        <textarea className="form-control" {...register('job_description', { required: 'Job description is required' })}></textarea>
        {errors.job_description && <span className="text-danger">{errors.job_description.message}</span>}
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" {...register('Graduate')} />
        <label className="form-check-label">Currently Graduate</label>
      </div>

      <button id="jobformSubmit" type="submit" className="btn btn-primary">Submit</button>
      <a href="/jobposting" id="jobformJobposting" className="btn btn-primary" >
        Job Postings
      </a>
    </form>

  );
}
