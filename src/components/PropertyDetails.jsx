import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bed, Bath, MapPin, Maximize,} from "lucide-react";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  // Get property ID from URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for property data and active tab
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch property data when component loads
  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find((prop) => prop.id === id);
        setProperty(foundProperty);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [id]);

  // Show loading while fetching data
  if (!property) {
    return <div className="prop-loading">Loading...</div>;
  }

  // Array of all property images
  const images = [
    property.img1,
    property.img2,
    property.img3,
    property.img4,
    property.img5,
    property.img6,
    property.img7,
  ];

  return (
    <div className="prop-wrapper">
      <div className="prop-container">
        
        {/* Back Button */}
        <button className="prop-back-btn" onClick={() => navigate("/search")}>
          <ArrowLeft size={20} />
          Back to Search
        </button>

        {/* Property Header - Title and Price */}
        <div className="prop-header">
          <div>
            <h1 className="prop-title">{property.type}</h1>
            <p className="prop-location">
              <MapPin size={18} />
              {property.location}
            </p>
          </div>
          <div className="prop-price-section">
            <p className="prop-price">£{property.price.toLocaleString()}</p>
            <span className="prop-tenure">{property.tenure}</span>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="prop-main-image">
          <img src={images[selectedImage]} alt="Property" />
        </div>

        {/* Thumbnail Images - Click to change main image */}
        <div className="prop-thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`View ${index + 1}`}
              className={selectedImage === index ? "active" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>

        {/* Property Info Cards */}
        <div className="prop-info-cards">
          <div className="prop-card">
            <Bed size={30} color="#1e3a8a" />
            <div>
              <p className="prop-card-number">{property.bedrooms}</p>
              <p className="prop-card-label">Bedrooms</p>
            </div>
          </div>
          <div className="prop-card">
            <Bath size={30} color="#1e3a8a" />
            <div>
              <p className="prop-card-number">{property.bathrooms}</p>
              <p className="prop-card-label">Bathrooms</p>
            </div>
          </div>
          <div className="prop-card">
            <Maximize size={30} color="#1e3a8a" />
            <div>
              <p className="prop-card-number">{property.type}</p>
              <p className="prop-card-label">Property Type</p>
            </div>
          </div>
          <div className="prop-card">
            <MapPin size={30} color="#1e3a8a" />
            <div>
              <p className="prop-card-number">{property.area} perches</p>
              <p className="prop-card-label">Land Size</p>
            </div>
          </div>
        </div>

        {/* Tabs - Description, Floor Plan, Map */}
        <div className="prop-tabs-section">
          <div className="prop-tabs">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "floorPlan" ? "active" : ""}
              onClick={() => setActiveTab("floorPlan")}
            >
              Floor Plan
            </button>
            <button
              className={activeTab === "map" ? "active" : ""}
              onClick={() => setActiveTab("map")}
            >
              Map
            </button>
          </div>

          {/* Tab Content */}
          <div className="prop-tab-content">
            {activeTab === "description" && (
              <div>
                <h2>Description</h2>
                <p>{property.description}</p>
              </div>
            )}
            
            {activeTab === "floorPlan" && (
              <div>
                <h2>Floor Plan</h2>
                <img src={property.floorMap} alt="Floor Plan" className="prop-floor-plan" />
              </div>
            )}
            
            {activeTab === "map" && (
              <div>
                <h2>Location</h2>
                <iframe
                  src={property.map}
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  title="Property Map"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;