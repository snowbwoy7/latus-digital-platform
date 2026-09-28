async function loadPropertyCatalogue() {
  const propertyCatalogue = document.querySelector("#property-catalogue");

  if (!propertyCatalogue) {
    return;
  }

  try {
    const response = await fetch("../data/properties.json");

    if (!response.ok) {
      throw new Error("Unable to load property data.");
    }

    const properties = await response.json();

    propertyCatalogue.innerHTML = "";

    properties.forEach((property) => {
      const propertyCard = document.createElement("article");

      propertyCard.classList.add("listing-card");

      const propertyLocation =
        property.location ?? "Location on request";

      const propertySize =
        property.size ?? "Size on request";

      const propertyPrice =
        property.price ?? "Price on request";

      propertyCard.innerHTML = `
        <div class="image-placeholder">
          Property Image
        </div>

        <div class="listing-content">

          <p class="listing-type">
            ${
              property.status === "demo"
                ? "Demo Listing"
                : "Available Property"
            }
          </p>

          <h3>${property.title}</h3>

          <p>
            ${propertyLocation} • ${propertySize}
          </p>

          <p class="price">
            ${propertyPrice}
          </p>

          <a href="./property.html?id=${property.id}">
            View Details →
          </a>

        </div>
      `;

      propertyCatalogue.appendChild(propertyCard);
    });

  } catch (error) {
    console.error("Property catalogue error:", error);

    propertyCatalogue.innerHTML = `
      <p>Property listings are currently unavailable.</p>
    `;
  }
}

loadPropertyCatalogue();