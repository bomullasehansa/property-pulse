import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Star, Home, DollarSign, Bed, MapPin, Calendar, Search as SearchIcon } from "lucide-react";
import './SearchPage.css';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    propertyType: "Any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    postcode: "",
    addedFrom: "",
    addedTo: "",
  });
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const validateFilters = () => {
    if (
      filters.minPrice < 0 ||
      filters.maxPrice < 0 ||
      filters.minBedrooms < 0 ||
      filters.maxBedrooms < 0
    ) {
      alert("Values cannot be negative.");
      return false;
    }
    if (filters.minPrice && filters.maxPrice && parseFloat(filters.minPrice) > parseFloat(filters.maxPrice)) {
      alert("Min Price cannot be greater than Max Price.");
      return false;
    }
    if (filters.minBedrooms && filters.maxBedrooms && parseInt(filters.minBedrooms) > parseInt(filters.maxBedrooms)) {
      alert("Min Bedrooms cannot be greater than Max Bedrooms.");
      return false;
    }
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!validateFilters()) return;

    const filtered = properties.filter((property) => {
      const matchesType =
        filters.propertyType === "Any" ||
        property.type.toLowerCase() === filters.propertyType.toLowerCase();
      const matchesMinPrice =
        !filters.minPrice || property.price >= parseInt(filters.minPrice, 10);
      const matchesMaxPrice =
        !filters.maxPrice || property.price <= parseInt(filters.maxPrice, 10);
      const matchesMinBedrooms =
        !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms, 10);
      const matchesMaxBedrooms =
        !filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms, 10);
      const matchesPostcode =
        !filters.postcode ||
        property.postcode.toLowerCase().includes(filters.postcode.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.postcode.toLowerCase());

      return (
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinBedrooms &&
        matchesMaxBedrooms &&
        matchesPostcode
      );
    });

    setFilteredProperties(filtered);
    
    // Scroll to search results smoothly
    setTimeout(() => {
      const resultsSection = document.querySelector('.search-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleReset = () => {
    setFilters({
      propertyType: "Any",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      postcode: "",
      addedFrom: "",
      addedTo: "",
    });
    setFilteredProperties(properties);

  // Scroll to top of search form
  setTimeout(() => {
    const searchForm = document.querySelector('.search-form-container');
    if (searchForm) {
      searchForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
  };

  const toggleFavourite = (property) => {
    const isFavourite = favourites.some((fav) => fav.id === property.id);
    
    if (isFavourite) {
      setFavourites(favourites.filter((fav) => fav.id !== property.id));
    } else {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (propertyId) => {
    setFavourites(favourites.filter((fav) => fav.id !== propertyId));
  };

  const isFavourite = (propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-page-container">
      {/* Main Content Area */}
      <div className="main-content">

        {/* Property Image Gallery Preview */}
        <div className="property-gallery-preview">
          <h3 className="gallery-title">Browse Our Properties 📸</h3>
          <div className="gallery-images">
            {properties.slice(0, 7).map((property, index) => (
              <div key={index} className="gallery-image-item">
                <img src={property.picture} alt={property.type} />
                <div className="gallery-overlay">
                  <span className="gallery-price">£{property.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <div className="search-form-container">
          <h2 className="form-title"><SearchIcon size={24} /> Search Properties</h2>
          <div className="divider"></div>
          
          <form onSubmit={handleSearch} className="search-form">
            {/* Property Type */}
            <div className="form-group full-width">
              <label className="form-label"><Home size={18} /> Property Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="Any">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            {/* Min and Max Price */}
            <div className="form-group half-width">
              <label className="form-label"><DollarSign size={18} /> Min Price (£)</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group half-width">
              <label className="form-label"><DollarSign size={18} /> Max Price (£)</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Min and Max Bedrooms */}
            <div className="form-group half-width">
              <label className="form-label"><Bed size={18} /> Min Bedrooms</label>
              <input
                type="number"
                name="minBedrooms"
                placeholder="Min"
                value={filters.minBedrooms}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group half-width">
              <label className="form-label"><Bed size={18} /> Max Bedrooms</label>
              <input
                type="number"
                name="maxBedrooms"
                placeholder="Max"
                value={filters.maxBedrooms}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Postcode Area */}
            <div className="form-group full-width">
              <label className="form-label"><MapPin size={18} /> Postcode Area</label>
              <input
                type="text"
                name="postcode"
                placeholder="e.g. BR1, NW1"
                value={filters.postcode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Added From and To */}
            <div className="form-group half-width">
              <label className="form-label"><Calendar size={18} /> Added From</label>
              <input
                type="text"
                name="addedFrom"
                placeholder="Select start date"
                value={filters.addedFrom}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group half-width">
              <label className="form-label"><Calendar size={18} /> Added To</label>
              <input
                type="text"
                name="addedTo"
                placeholder="Select end date"
                value={filters.addedTo}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-group half-width">
              <button type="submit" className="btn btn-primary">
                Search Properties
              </button>
            </div>
            <div className="form-group half-width">
              <button type="button" onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div className="search-results">
          <h2 className="results-title">Search Results</h2>
          <div className="properties-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="property-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, property)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="property-image-container">
                    <img
                      src={property.picture}
                      alt="Property"
                      className="property-image"
                    />
                    <button
                      className={`favorite-btn ${isFavourite(property.id) ? 'active' : ''}`}
                      onClick={() => toggleFavourite(property)}
                      aria-label="Add to favourites"
                    >
                      <Heart
                        size={20}
                        fill={isFavourite(property.id) ? "#e91e63" : "none"}
                        stroke={isFavourite(property.id) ? "#e91e63" : "#fff"}
                      />
                    </button>
                  </div>
                  <div className="property-content">
                    <h3 className="property-price">
                      £{property.price.toLocaleString()}
                    </h3>
                    <p className="property-description">
                      {property.description.substring(0, 120)}...
                    </p>
                    <div className="property-details">
                      <span className="property-detail">
                        <span className="icon">🛏️</span> {property.bedrooms} Bedrooms
                      </span>
                      <span className="property-detail">
                        <span className="icon">🚿</span> {property.bathrooms} Bathrooms
                      </span>
                    </div>
                    <p className="property-location">
                      📍 {property.location}
                    </p>
                    <Link to={`/property/${property.id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No properties found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar - Favourites */}
      <div
        className="sidebar"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2 className="sidebar-title">Favourites</h2>
        <div className="sidebar-divider"></div>
        
        {favourites.length === 0 ? (
          <div className="empty-favourites">
            <Star size={48} color="#d1d5db" />
            <h3>No favourites yet</h3>
            <p>Drag properties here or click the ★ icon</p>
          </div>
        ) : (
          <div className="favourites-list">
            {favourites.map((property) => (
              <div key={property.id} className="favourite-item">
                <img
                  src={property.picture}
                  alt="Property"
                  className="favourite-image"
                />
                <div className="favourite-info">
                  <h4 className="favourite-price">
                    £{property.price.toLocaleString()}
                  </h4>
                  <p className="favourite-location">{property.location}</p>
                  <p className="favourite-details">
                    {property.bedrooms} bed • {property.bathrooms} bath
                  </p>
                </div>
                <button
                  className="remove-favourite-btn"
                  onClick={() => removeFavourite(property.id)}
                  aria-label="Remove from favourites"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;