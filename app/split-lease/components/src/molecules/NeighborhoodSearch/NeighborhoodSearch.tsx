import React, { useState } from 'react';
import {
  Container,
  Label,
  SearchInput,
  ListBox,
  ListItem,
  EmptyState,
} from './NeighborhoodSearch.styles';
import { NeighborhoodSearchProps } from './types';

/**
 * NeighborhoodSearch - Search and multi-select for neighborhoods
 * Note: This is a placeholder component. Neighborhood data will be loaded
 * from Supabase in a future implementation based on selected borough.
 */
export const NeighborhoodSearch: React.FC<NeighborhoodSearchProps> = ({
  selectedNeighborhoods = [],
  onChange,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Placeholder: In real implementation, this will filter neighborhoods based on borough
  const filteredNeighborhoods: string[] = [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    const isSelected = selectedNeighborhoods.includes(neighborhood);
    const newSelection = isSelected
      ? selectedNeighborhoods.filter(n => n !== neighborhood)
      : [...selectedNeighborhoods, neighborhood];

    onChange?.(newSelection);
  };

  return (
    <Container className={className}>
      <Label htmlFor="neighborhood-search">Refine Neighborhood(s)</Label>
      <SearchInput
        id="neighborhood-search"
        type="text"
        placeholder="Search neighborhoods..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        aria-label="Search neighborhoods"
      />

      <ListBox className={isFocused && searchTerm ? 'show' : ''}>
        {filteredNeighborhoods.length > 0 ? (
          filteredNeighborhoods.map((neighborhood) => (
            <ListItem
              key={neighborhood}
              selected={selectedNeighborhoods.includes(neighborhood)}
              onClick={() => handleNeighborhoodToggle(neighborhood)}
              role="option"
              aria-selected={selectedNeighborhoods.includes(neighborhood)}
            >
              {neighborhood}
            </ListItem>
          ))
        ) : (
          <EmptyState>
            Neighborhood data will be loaded from database
          </EmptyState>
        )}
      </ListBox>
    </Container>
  );
};

export default NeighborhoodSearch;
