import React, { useState } from 'react';

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    qualification: '',
    portfolio: '',
    location: '',
    gender: '',
    experience: '',
    employed: '',
    company: '',
    skills: [],
    declaration: false,
  });

  const [errors, setErrors] = useState({});

  const skillOptions = ['React', 'Python', 'Java', 'SQL', 'AWS'];
  const locations = ['Hyderabad', 'Bangalore', 'Pune', 'Remote'];

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Name must contain only letters and spaces';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';

    if (formData.portfolio && !/^https?:\/\/.+\..+/.test(formData.portfolio)) {
      newErrors.portfolio = 'Invalid portfolio URL';
    }

    if (!formData.location) newErrors.location = 'Preferred location is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience) || Number(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a non-negative number';
    }

    if (!formData.employed) {
      newErrors.employed = 'Please select employment status';
    }

    if (formData.employed === 'yes' && !formData.company.trim()) {
      newErrors.company = 'Current company is required';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Select at least one skill';
    }

    if (!formData.declaration) {
      newErrors.declaration = 'You must confirm the declaration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'skills') {
      const updatedSkills = checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else if (type === 'checkbox' && name === 'declaration') {
      setFormData({ ...formData, declaration: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Job Application Form</h2>

      <h3>Personal Information</h3>
      <label>
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </label>

      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
      </label>

      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
      </label>

      <label>
        Address:
        <textarea name="address" rows="3" value={formData.address} onChange={handleChange} />
        {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
      </label>

      <label>
        Gender:
        <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
        {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
      </label>

      <label>
        Highest Qualification:
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
        {errors.qualification && <span style={{ color: 'red' }}>{errors.qualification}</span>}
      </label>

      <label>
        Portfolio URL:
        <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} />
        {errors.portfolio && <span style={{ color: 'red' }}>{errors.portfolio}</span>}
      </label>

      <label>
        Preferred Job Location:
        <select name="location" value={formData.location} onChange={handleChange}>
          <option value="">Select</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
      </label>

      <h3>Professional Information</h3>
      <label>
        Experience (Years):
        <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
        {errors.experience && <span style={{ color: 'red' }}>{errors.experience}</span>}
      </label>

      <label>Employed:</label>
      <label>
        <input type="radio" name="employed" value="yes" checked={formData.employed === 'yes'} onChange={handleChange} />
        Yes
      </label>
      <label>
        <input type="radio" name="employed" value="no" checked={formData.employed === 'no'} onChange={handleChange} />
        No
      </label>
      {errors.employed && <div style={{ color: 'red' }}>{errors.employed}</div>}

      {formData.employed === 'yes' && (
        <label>
          Current Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
          {errors.company && <span style={{ color: 'red' }}>{errors.company}</span>}
        </label>
      )}

      <h3>Skills</h3>
      {skillOptions.map((skill) => (
        <label key={skill}>
          <input
            type="checkbox"
            name="skills"
            value={skill}
            checked={formData.skills.includes(skill)}
            onChange={handleChange}
          />
          {skill}
        </label>
      ))}
      {errors.skills && <div style={{ color: 'red' }}>{errors.skills}</div>}

      <h3>Declaration</h3>
      <label>
        <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} />
        I confirm that the above information is true.
      </label>
      {errors.declaration && <div style={{ color: 'red' }}>{errors.declaration}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default JobApplicationForm;
