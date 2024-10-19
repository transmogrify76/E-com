import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AddProductDetails.css';

const AddProductDetails = () => {
    const location = useLocation();
    const { uploadedImages } = location.state || { uploadedImages: [] };
    const [productDetails, setProductDetails] = useState({
        productName: '',
        size: '',
        color: '',
        fabric: '',
        fitShape: '',
        netQuantity: '',
        neck: '',
        occasion: '',
        pattern: '',
        printOrPatternType: '',
        sleeveLength: '',
        countryOfOrigin: '',
        manufacturerDetails: '',
        packerDetails: '',
        brand: '',
        character: '',
        hemline: '',
        length: '',
        numberOfPockets: '',
        sleeveStyling: '',
        description: '',
        importerDetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(productDetails);
    };

    return (
        <div className="product-details-container">
            <div className="header-section">
                <h2>Add Single Catalog</h2>
            </div>

            <div className="product-images">
                <h3>Uploaded Images</h3>
                {uploadedImages.map((image, index) => (
                    <div key={index} className="image-preview">
                        <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                    </div>
                ))}
            </div>

            <form className="product-details-form" onSubmit={handleSubmit}>
                <h3>Product Information</h3>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Name*</label>
                        <input type="text" name="productName" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Size*</label>
                        <input type="text" name="size" required onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Color*</label>
                        <input type="text" name="color" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Fabric</label>
                        <input type="text" name="fabric" onChange={handleChange} />
                    </div>
                </div>

                <h3>Product Details</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Fit/Shape</label>
                        <input type="text" name="fitShape" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Net Quantity (N)*</label>
                        <input type="text" name="netQuantity" required onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Neck</label>
                        <input type="text" name="neck" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Occasion</label>
                        <input type="text" name="occasion" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Pattern</label>
                        <input type="text" name="pattern" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Print Or Pattern Type</label>
                        <input type="text" name="printOrPatternType" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Sleeve Length</label>
                        <input type="text" name="sleeveLength" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>COUNTRY OF ORIGIN*</label>
                        <input type="text" name="countryOfOrigin" required onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Manufacturer Details</label>
                        <input type="text" name="manufacturerDetails" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Packer Details</label>
                        <input type="text" name="packerDetails" onChange={handleChange} />
                    </div>
                </div>

                <h3>Other Attributes</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" name="brand" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Character</label>
                        <input type="text" name="character" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Hemline</label>
                        <input type="text" name="hemline" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Length</label>
                        <input type="text" name="length" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Number of Pockets</label>
                        <input type="text" name="numberOfPockets" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Sleeve Styling</label>
                        <input type="text" name="sleeveStyling" onChange={handleChange} />
                    </div>
                </div>

                <label>Description</label>
                <textarea name="description" maxLength="6000" onChange={handleChange}></textarea>

                <label>Importer Details</label>
                <input type="text" name="importerDetails" onChange={handleChange} />

                <button type="submit">Submit Catalog</button>
            </form>

            {/* Image Guidelines */}
            <div className="image-guidelines">
                <h3>Image Guidelines</h3>
                <p>View Full Image Guidelines:</p>
                <ul>
                    <li>Images with text/Watermark are not acceptable in primary images.</li>
                    <li>Product image should not have any text.</li>
                    <li>Please add solo product image without any props.</li>
                </ul>
            </div>
        </div>
    );
};

export default AddProductDetails;
