export interface Neighborhood {
  id: string;
  name: string;
  borough: string;
}

export interface NeighborhoodSearchProps {
  selectedNeighborhoods?: string[];
  onChange?: (neighborhoods: string[]) => void;
  className?: string;
}
