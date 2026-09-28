async function loadPropertyDetails() {
  const propertyDetail = document.querySelector("#property-detail");

  if (!propertyDetail) {
    return;
  }

  try {
    const parameters = new URLSearchParams(window.location.search);

    const propertyId = parameters.get("id");

    if (!propertyId) {
      throw new Error("No property ID was provided.");
    }

    const response = await fetch("../data/properties.json");

    if (!response.ok) {
      throw new Error("Unable to load property data.");
    }

    const properties = await response.json();

    const selectedProperty = properties.find(
      (property) => property.id === propertyId
    );

    if (!selectedProperty) {
      throw new Error("Property not found.");
    }

    renderPropertyDetails(selectedProperty);

  } catch (error) {
    console.error("Property detail error:", error);

    propertyDetail.innerHTML = `
      <div class="detail-message">
        <h1>Property unavailable</h1>

        <p>
          We could not find the requested property.
        </p>

        <a href="./properties.html" class="button">
          Browse Properties
        </a>
      </div>
    `;
  }
}


function renderPropertyDetails(property) {
  const propertyDetail = document.querySelector("#property-detail");

  const propertyLocation =
    property.location ?? "On request";

  const propertyPrice =
    property.price ?? "Price on request";

  const propertySize =
    property.size ?? "On request";

  const propertyDocumentation =
    property.documentation ?? "On request";

  propertyDetail.innerHTML = `
    <div class="detail-layout">

      <div class="detail-media">

        <div class="image-placeholder detail-image">
          Property Image
        </div>

      </div>


      <div class="detail-content">

        <p class="eyebrow">
          ${
            property.status === "demo"
              ? "Demo Property"
              : "Available Property"
          }
        </p>

        <h1>${property.title}</h1>

        <p class="detail-price">
          ${propertyPrice}
        </p>


        <div class="detail-specifications">

          <div>
            <span>Location</span>
            <strong>${propertyLocation}</strong>
          </div>

          <div>
            <span>Property Type</span>
            <strong>${property.propertyType}</strong>
          </div>

          <div>
            <span>Size</span>
            <strong>${propertySize}</strong>
          </div>

          <div>
            <span>Documentation</span>
            <strong>${propertyDocumentation}</strong>
          </div>

        </div>


        <div class="detail-description">

          <h2>Property Information</h2>

          <p>${property.description}</p>

        </div>


        <a href="#" class="button">
          Enquire About This Property
        </a>

      </div>

    </div>
  `;
}


loadPropertyDetails();