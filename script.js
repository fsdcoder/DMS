document.addEventListener("DOMContentLoaded", () => {
    const doctors = [
      { id: 1, name: "General Physician", slots: generateTimeSlots() },
      { id: 2, name: "Surgeon", slots: generateTimeSlots() },
      { id: 3, name: "Homeopath", slots: generateTimeSlots() },
      { id: 5, name: "Ayurvedic", slots: generateTimeSlots() },
      { id: 5, name: "ENT", slots: generateTimeSlots() }
    ];
    const appointments = [];
  
    function generateTimeSlots() {
      const slots = [];
      for (let hour = 0; hour < 24; hour++) {
        const hourStr = hour.toString().padStart(2, '0');
        slots.push({ time: `${hourStr}:00`, booked: false });
        slots.push({ time: `${hourStr}:30`, booked: false });
      }
      return slots;
    }
  
    function displayDoctors() {
      const doctorsList = document.getElementById('doctors-list');
      doctorsList.innerHTML = '';
      doctors.forEach(doctor => {
        const bookedSlots = doctor.slots.filter(slot => slot.booked).length;
        const doctorDiv = document.createElement('div');
        doctorDiv.classList.add('doctor');
        doctorDiv.innerHTML = `
          <h3>${doctor.name}</h3>
          <p>Total Slots: ${doctor.slots.length}</p>
          <p>Booked Slots: ${bookedSlots}</p>
        `;
        doctorsList.appendChild(doctorDiv);
      });
    }
  
    function displayAppointments() {
      const appointmentsList = document.getElementById('appointments-list');
      appointmentsList.innerHTML = '';
      appointments.forEach(appointment => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.classList.add('appointment');
        appointmentDiv.innerHTML = `
          <p>ID: ${appointment.id}</p>
          <p>Patient: ${appointment.patient}</p>
          <p>Doctor: ${appointment.doctor.name}</p>
          <p>Date: ${appointment.date}</p>
          <p>Time: ${appointment.time}</p>
        `;
        appointmentsList.appendChild(appointmentDiv);
      });
    }
  
    function bookAppointment(patient, doctor, date, time) {
      const appointmentId = `A${appointments.length + 1}`;
      const slot = doctor.slots.find(slot => slot.time === time && !slot.booked);
      if (slot) {
        slot.booked = true;
        appointments.push({ id: appointmentId, patient, doctor, date, time });
        alert('Appointment booked successfully!');
        displayAppointments();
        displayDoctors();
      } else {
        alert('Selected time slot is not available!');
      }
    }
  
    function cancelAppointment(id) {
      const index = appointments.findIndex(app => app.id === id);
      if (index !== -1) {
        const appointment = appointments.splice(index, 1)[0];
        const slot = appointment.doctor.slots.find(slot => slot.time === appointment.time);
        slot.booked = false;
        alert('Appointment canceled successfully!');
        displayAppointments();
        displayDoctors();
      } else {
        alert('Invalid appointment ID!');
      }
    }
  
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patient-name').value;
      const doctorId = document.getElementById('doctor-selection').value;
      const appointmentDate = document.getElementById('appointment-date').value;
      const appointmentTime = document.getElementById('appointment-time').value;
  
      const doctor = doctors.find(doc => doc.id == doctorId);
      bookAppointment(patientName, doctor, appointmentDate, appointmentTime);
    });
  
    const cancellationForm = document.getElementById('cancellation-form');
    cancellationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const appointmentId = document.getElementById('appointment-id').value;
      cancelAppointment(appointmentId);
    });
  
    const viewAppointmentsBtn = document.getElementById('view-appointments-btn');
    viewAppointmentsBtn.addEventListener('click', displayAppointments);
  
    const doctorSelect = document.getElementById('doctor-selection');
    doctors.forEach(doctor => {
      const option = document.createElement('option');
      option.value = doctor.id;
      option.textContent = doctor.name;
      doctorSelect.appendChild(option);
    });
  
    function populateTimeSlots() {
      const timeSelect = document.getElementById('appointment-time');
      for (let hour = 0; hour < 24; hour++) {
        const hourStr = hour.toString().padStart(2, '0');
        timeSelect.appendChild(new Option(`${hourStr}:00`));
        timeSelect.appendChild(new Option(`${hourStr}:30`));
      }
    }
  
    populateTimeSlots();
    displayDoctors();
  });
  