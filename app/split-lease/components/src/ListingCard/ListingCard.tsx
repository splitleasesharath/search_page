/**
 * ListingCard component - Individual listing display card
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ListingCardProps } from './types';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Location = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const Details = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #007AFF;
`;

const PriceLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const ViewButton = styled.button`
  padding: 8px 16px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0066DD;
  }
`;

export const ListingCard: React.FC<ListingCardProps> = ({ listing, price, onView }) => {
  const displayPrice = price || listing.pricing?.standardized_minimum_nightly_price || 0;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      onClick={() => onView?.(listing.id)}
    >
      <ImageContainer>
        {listing.primary_photo_url ? (
          <Image src={listing.primary_photo_url} alt={listing.name || 'Listing'} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
            No image available
          </div>
        )}
      </ImageContainer>

      <Content>
        <Title>{listing.name || 'Untitled Listing'}</Title>
        <Location>
          {listing.location?.neighborhood && listing.location?.borough
            ? `${listing.location.neighborhood}, ${listing.location.borough}`
            : listing.location?.borough || 'Location not specified'}
        </Location>

        <Details>
          {listing.features?.bedrooms !== undefined && (
            <span>{listing.features.bedrooms} {listing.features.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          )}
          {listing.features?.bathrooms !== undefined && (
            <span>{listing.features.bathrooms} {listing.features.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          )}
          {listing.features?.type_of_space && <span>{listing.features.type_of_space}</span>}
        </Details>

        <PriceRow>
          <div>
            <Price>${displayPrice}</Price>
            <PriceLabel>/night</PriceLabel>
          </div>
          <ViewButton onClick={(e) => { e.stopPropagation(); onView?.(listing.id); }}>
            View
          </ViewButton>
        </PriceRow>
      </Content>
    </Card>
  );
};

export default ListingCard;
