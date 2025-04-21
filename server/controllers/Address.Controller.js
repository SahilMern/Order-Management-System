import { Address } from "../models/Address.model.js";

export const createAddress = async (req, res) => {
  try {
    let {
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
      addressType,
      landmark,
    } = req.body;

    if (addressType) {
      addressType = addressType.toLowerCase();
    }

    const validTypes = ["home", "work", "other"];
    if (addressType && !validTypes.includes(addressType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address type. Must be one of: home, work, other"
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      user: req.user._id,
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country: country || "India",
      isDefault: isDefault || false,
      addressType: addressType || "home",
      landmark
    });

    res.status(201).json({
      success: true,
      address,
    });

  } catch (error) {
    console.error("Create address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create address",
      error: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    console.log(req.user, "eq.user");
    
    const addresses = await Address.find({ user: req.user._id });

    res.json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If setting as default, remove default status from other addresses
    if (updateData.isDefault) {
      await Address.updateMany(
        { user: req.user._id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    console.error("Update address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: error.message,
    });
  }
};

// Set default address
export const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    const address = await Address.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    console.error("Set default address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set default address",
      error: error.message,
    });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (address.isDefault) {
      const newDefault = await Address.findOne({ user: req.user._id });
      if (newDefault) {
        newDefault.isDefault = true;
        await newDefault.save();
      }
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete address",
      error: error.message,
    });
  }
};
