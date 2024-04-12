export const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
};

export const generateTimeSlots = (start: string, end: string) => {
    const timeSlots = [];

    // Convert start and end times to Date objects
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    // Loop through time slots in 30-minute increments
    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
        const slotStartTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        currentTime.setMinutes(currentTime.getMinutes() + 30);
        const slotEndTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        timeSlots.push([slotStartTime, slotEndTime]);
    }

    return timeSlots;
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}