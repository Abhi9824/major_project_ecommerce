import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAddress, fetchAllAddress, updateAddress } from "../../features/addressSlice";
import { useLocation } from "react-router-dom";

const AddressForm = ({ setShowForm}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const existingAddress = location.state;

  const [formData, setFormData] = useState(
    existingAddress || {
      contact: { name: "", phoneNumber: "" },
      address: { pinCode: "", street: "", locality: "", city: "", state: "" },
    }
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [error,setError]=useState("")

  // useEffect(() => {
  //   if (existingAddress) {
  //     setFormData(existingAddress);
  //   }
  // }, [existingAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.'); // Splits name into sections
  
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(
      !formData.contact.name ||
      !formData.contact.phoneNumber ||
      !formData.address.pinCode ||
      !formData.address.locality ||
      !formData.address.street ||
      !formData.address.state 
    ){
    setError("All field are required.")
    return
    }
    setError("")

    const addressData=({
      name:formData.contact.name,
      phoneNumber:formData.contact.phoneNumber,
      pinCode:formData.address.pinCode,
      locality:formData.address.locality,
      street:formData.address.street,
      state:formData.address.state
    })

    if (existingAddress) {
      dispatch(updateAddress({ _id: existingAddress._id, dataToUpdate: addressData }));
      setSuccessMessage("Address Updated Successfully");
    } else {
      dispatch(addAddress(addressData)).then( ()=>{
        //re-fetch addresses after adding a new one
        dispatch(fetchAllAddress())
      });

      setSuccessMessage("Address Added Successfully");
    }

    setFormData({
       contact: { name: "", phoneNumber: "" },
      address: { pinCode: "", street: "", locality: "", city: "", state: "" },
    })
    setTimeout(() => {
      setSuccessMessage("");
      setShowForm(false); // Close modal on success
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="contact.name"
          value={formData.contact.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input
          type="text"
          name="contact.phoneNumber"
          value={formData.contact.phoneNumber}
          onChange={handleChange}
          required
          pattern="^(?:7|8|9)\d{9}$"
          title="Please provide a valid 10-digit Indian phone number"
          className="form-control"
        />
      </div>
      {/* Address Fields */}
      <div className="mb-3">
        <label>Pin Code</label>
        <input
          type="text"
          name="address.pinCode"
          value={formData.address.pinCode}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Street</label>
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Locality</label>
        <input
          type="text"
          name="address.locality"
          value={formData.address.locality}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>City</label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>State</label>
        <input
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {existingAddress ? "Update Address" : "Add Address"}
      </button>
      {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
    </form>
  );
};

export default AddressForm;
