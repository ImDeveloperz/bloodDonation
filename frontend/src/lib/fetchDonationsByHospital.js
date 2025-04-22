export async function fetchDonationsByHospital(hospitalName) {
    try {
      const response = await fetch(`https://backendblooddonation.fly.dev/donations?hospital=${encodeURIComponent(hospitalName)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const donations = await response.json();
      return donations;
    } catch (error) {
      console.error("Failed to fetch donations:", error);
      return [];
    }
  }
  