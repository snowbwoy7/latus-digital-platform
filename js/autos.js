async function loadVehicleCatalogue() {
  const vehicleCatalogue = document.querySelector("#vehicle-catalogue");

  if (!vehicleCatalogue) {
    return;
  }

  try {
    const response = await fetch("../data/vehicles.json");

    if (!response.ok) {
      throw new Error("Unable to load vehicle data.");
    }

    const vehicles = await response.json();

    vehicleCatalogue.innerHTML = "";

    vehicles.forEach((vehicle) => {
      const vehicleCard = document.createElement("article");

      vehicleCard.classList.add("listing-card");

      const vehicleName = `${vehicle.make} ${vehicle.model}`;

      const vehicleYear =
        vehicle.year ?? "Year on request";

      const vehiclePrice =
        vehicle.price ?? "Price on request";

      vehicleCard.innerHTML = `
        <div class="image-placeholder">
          Vehicle Image
        </div>

        <div class="listing-content">

          <p class="listing-type">
            ${
              vehicle.status === "demo"
                ? "Demo Listing"
                : "Available Vehicle"
            }
          </p>

          <h3>${vehicleName}</h3>

          <p>
            ${vehicleYear} • ${vehicle.condition}
          </p>

          <p class="price">
            ${vehiclePrice}
          </p>

          <a href="./vehicle.html?id=${vehicle.id}">
            View Details →
          </a>

        </div>
      `;

      vehicleCatalogue.appendChild(vehicleCard);
    });

  } catch (error) {
    console.error("Vehicle catalogue error:", error);

    vehicleCatalogue.innerHTML = `
      <p>Vehicle listings are currently unavailable.</p>
    `;
  }
}

loadVehicleCatalogue();