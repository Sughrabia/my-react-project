import React from 'react';
import {Link} from 'react-router-dom';

const ShippingForm = () => {
  return (
    <div className="shipping-form">
      <h2>Ship To</h2>
      <form>
        {/* First Name & Last Name */}
        <div className="twofields">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" required />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" required />
          </div>
        </div>

        {/* Street Address */}
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" name="address" required />
          <Link>Add Apt, suite or other</Link>
        </div>

        {/* Postal Code & Town/City */}
        <div className="twofields">
          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" name="postalCode" required />
          </div>

          <div className="form-group">
            <label>Town/City</label>
            <input type="text" name="city" required />
          </div>
        </div>

        {/* Province */}
        <div className="form-group">
          <label>Province</label>
          <select name="province" required>
            <option value="">Please Select</option>
            <option value="province1">Province 1</option>
            <option value="province2">Province 2</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" required />
        </div>

        {/* Use as Billing Address
        <div className="form-group checkbox">
          <input type="checkbox" name="billingAddress" />
          <label>Use as billing address</label>
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="btn-next">Next</button>
      </form>
    </div>
  );
}

export default ShippingForm;
