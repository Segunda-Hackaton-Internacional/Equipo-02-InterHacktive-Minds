enum Status {
    DISPONIBLE = "DISPONIBLE",
    POR_VENCER = "POR_VENCER",
    VENCIDA = "VENCIDA"
  }
  
  function checkDateStatus(targetDate: Date, daysToCheck: number = 30): Status {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date by setting time to midnight
    
    const dateToCheck = new Date(targetDate);
    dateToCheck.setHours(0, 0, 0, 0); // Normalize target date by setting time to midnight
  
    // Calculate the difference in days
    const diffTime = dateToCheck.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
      return Status.VENCIDA; // Date is in the past
    } else if (diffDays <= daysToCheck) {
      return Status.POR_VENCER; // Date is within the threshold (30 days or specified daysToCheck)
    } else {
      return Status.DISPONIBLE; // Date is more than 30 days (or specified daysToCheck) in the future
    }
  }
  
 