import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RecruiterProfile = () => {
  const { companyData, setCompanyData, backendUrl } = useContext(AppContext)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: companyData.name || '',
    email: companyData.email || '',
    password: '',
    image: null,
    mobile: companyData.mobile || '',
    company: companyData.company || '',
    designation: companyData.designation || '',
    location: companyData.location || '',
  })
  const [preview, setPreview] = useState(companyData.image)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, image: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async () => {
    try {
      const form = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value)
      })

      const res = await axios.post(
        backendUrl + '/api/Company/update-profile',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('companyToken')}`,
          },
        }
      )

      setCompanyData(res.data.company)
      setEditMode(false)
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  const cancelEdit = () => {
    setEditMode(false)
    setFormData({
      name: companyData.name,
      email: companyData.email,
      password: '',
      image: null,
      mobile: companyData.mobile || '',
      company: companyData.company || '',
      designation: companyData.designation || '',
      location: companyData.location || '',
    })
    setPreview(companyData.image)
  }

  return (
    <div className="max-w-3xl px-6 py-8 mx-auto bg-white shadow-2xl rounded-2xl sm:px-10">
      <h2 className="mb-8 text-3xl font-bold text-center text-blue-800">Recruiter Profile</h2>

      <div className="flex flex-col items-center justify-center mb-6">
        <img
          src={preview}
          alt="Profile"
          className="object-cover w-32 h-32 border-4 border-blue-300 rounded-full shadow-md"
        />
        {!editMode && <p className="mt-2 text-sm text-gray-500">Company Logo</p>}
      </div>

      {!editMode ? (
        <div className="grid grid-cols-1 gap-4 text-gray-700 sm:grid-cols-2">
          <p><strong>Name:</strong> {companyData.name}</p>
          <p><strong>Email:</strong> {companyData.email}</p>
          <p><strong>Mobile:</strong> {companyData.mobile || '—'}</p>
          <p><strong>Company:</strong> {companyData.company || '—'}</p>
          <p><strong>Designation:</strong> {companyData.designation || '—'}</p>
          <p><strong>Location:</strong> {companyData.location || '—'}</p>

          <div className="mt-6 sm:col-span-2">
            <button
              onClick={() => setEditMode(true)}
              className="w-full px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name */}
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />

          {/* Email */}
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />

          {/* Mobile */}
          <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />

          {/* Company */}
          <InputField label="Company Name" name="company" value={formData.company} onChange={handleChange} />

          {/* Designation */}
          <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />

          {/* Location */}
          <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />

          {/* Password */}
          <InputField
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-600">Profile Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:col-span-2">
            <button
              onClick={handleUpdate}
              className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
)

export default RecruiterProfile
