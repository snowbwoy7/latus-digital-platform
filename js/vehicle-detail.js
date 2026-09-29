async function loadVehicleDetails() {
  const vehicleDetail = document.querySelector("#vehicle-detail");

  if (!vehicleDetail) {
    return;
  }

  try {
    const parameters = new URLSearchParams(window.location.search);

    const vehicleId = parameters.get("id");

    if (!vehicleId) {
      throw new Error("No vehicle ID was provided.");
    }

    const response = await fetch("../data/vehicles.json");

    if (!response.ok) {
      throw new Error("Unable to load vehicle data.");
    }

    const vehicles = await response.json();

    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );

    if (!selectedVehicle) {
      throw new Error("Vehicle not found.");
    }

    renderVehicleDetails(selectedVehicle);

  } catch (error) {
    console.error("Vehicle detail error:", error);

    vehicleDetail.innerHTML = `
      <div class="detail-message">
        <h1>Vehicle unavailable</h1>
        <p>
          We could not find the requested vehicle.
        </p>
        <a href="./autos.html" class="button">
          Browse Vehicles
        </a>
      </div>
    `;
  }
}


function renderVehicleDetails(vehicle) {
  const vehicleDetail = document.querySelector("#vehicle-detail");

  const vehicleName = `${vehicle.make} ${vehicle.model}`;

  const vehicleYear =
    vehicle.year ?? "On request";

  const vehiclePrice =
    vehicle.price ?? "Price on request";

  const vehicleMileage =
    vehicle.mileage ?? "On request";

  const vehicleTransmission =
    vehicle.transmission ?? "On request";

  const vehicleFuelType =
    vehicle.fuelType ?? "On request";

    const vehicleColour =
  vehicle.colour ?? "On request";

const whatsappNumber = "2348023655929";

const enquiryMessage =
  `Hello Latus, I'm interested in ${vehicleName}. ` +
  `Reference: ${vehicle.id}. I'd like more information about this vehicle.`;

const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiryMessage)}`;

vehicleDetail.innerHTML = `
  <div class="detail-layout">

      <div class="detail-media">
        <div class="image-placeholder detail-image">
          Vehicle Image
        </div>
      </div>


      <div class="detail-content">

        <p class="eyebrow">
          ${
            vehicle.status === "demo"
              ? "Demo Vehicle"
              : "Available Vehicle"
          }
        </p>

        <h1>${vehicleName}</h1>

        <p class="detail-price">
          ${vehiclePrice}
        </p>

        <div class="detail-specifications">

          <div>
            <span>Year</span>
            <strong>${vehicleYear}</strong>
          </div>

          <div>
            <span>Condition</span>
            <strong>${vehicle.condition}</strong>
          </div>

          <div>
            <span>Mileage</span>
            <strong>${vehicleMileage}</strong>
          </div>

          <div>
            <span>Transmission</span>
            <strong>${vehicleTransmission}</strong>
          </div>

          <div>
            <span>Fuel Type</span>
            <strong>${vehicleFuelType}</strong>
          </div>

          <div>
            <span>Colour</span>
            <strong>${vehicleColour}</strong>
          </div>
          
          </div>

        <div class="detail-description">
          <h2>Vehicle Information</h2>
          <p>${vehicle.description}</p>
        </div>

        <a href="${whatsappUrl}"
        class="button"
        target="_blank"
        rel="noopener noreferrer">
        Enquire About This Vehicle</a>

      </div>

    </div>
  `;
}


loadVehicleDetails();

