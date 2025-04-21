export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Customer Name validation
  if (!formData.customerName.trim()) {
    errors.customerName = "Customer Name is required";
    isValid = false;
  } else if (
    formData.customerName.length < 3 ||
    formData.customerName.length > 30
  ) {
    errors.customerName = "Must be between 3-30 characters";
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  // Contact Number validation
  const phoneRegex = /^\d{10}$/;
  if (!formData.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required";
    isValid = false;
  } else if (!phoneRegex.test(formData.contactNumber)) {
    errors.contactNumber = "Must be 10 digits";
    isValid = false;
  }

  // Shipping Address validation
  if (!formData.shippingAddress.trim()) {
    errors.shippingAddress = "Shipping address is required";
    isValid = false;
  } else if (formData.shippingAddress.length > 100) {
    errors.shippingAddress = "Must be less than 100 characters";
    isValid = false;
  }

  // Quantity validation
  if (!formData.quantity || formData.quantity < 1 || formData.quantity > 100) {
    errors.quantity = "Must be between 1-100";
    isValid = false;
  }

  return { errors, isValid };
};