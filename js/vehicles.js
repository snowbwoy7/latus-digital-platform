async function loadFeaturedVehicles() {
  const vehicleContainer = document.querySelector("#featured-vehicles");

  if (!vehicleContainer) {
    return;
  }

  try {
    const response = await fetch("./data/vehicles.json");

    if (!response.ok) {
      throw new Error("Unable to load vehicle data.");
    }

    const vehicles = await response.json();

    const featuredVehicles = vehicles.filter(
      (vehicle) => vehicle.featured === true
    );

    vehicleContainer.innerHTML = "";

    featuredVehicles.forEach((vehicle) => {
      const vehicleCard = document.createElement("article");

      vehicleCard.classList.add("listing-card");

      const vehicleName = `${vehicle.make} ${vehicle.model}`;

      const vehicleYear = vehicle.year ?? "Year on request";
      const vehiclePrice = vehicle.price ?? "Price on request";

      vehicleCard.innerHTML = `
        <div class="image-placeholder">
          Vehicle Image
        </div>

        <div class="listing-content">
          <p class="listing-type">
            ${vehicle.status === "demo" ? "Demo Listing" : "Available Vehicle"}
          </p>

          <h3>${vehicleName}</h3>

          <p>
            ${vehicleYear} • ${vehicle.condition}
          </p>

          <p class="price">${vehiclePrice}</p>

          <a href="./pages/vehicle.html?id=${vehicle.id}">
            View Details →
          </a>
        </div>
      `;

      vehicleContainer.appendChild(vehicleCard);
    });
  } catch (error) {
    console.error("Vehicle loading error:", error);

    vehicleContainer.innerHTML = `
      <p>Vehicle listings are currently unavailable.</p>
    `;
  }
}

loadFeaturedVehicles();