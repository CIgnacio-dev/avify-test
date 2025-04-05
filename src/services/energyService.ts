export type GenerationMix = {
    fuel: string;
    perc: number;
  };
  
  export async function fetchEnergyMix(): Promise<GenerationMix[]> {
    try {
      const response = await fetch("https://api.carbonintensity.org.uk/generation");
      const data = await response.json();
      return data.data.generationmix;
    } catch (error) {
      console.error("Error fetching energy mix:", error);
      return [];
    }
  }
  