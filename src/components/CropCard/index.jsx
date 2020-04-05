import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { moneyFormat } from '../../helpers/moneyFormat';
import { SizedBox } from '../../UiKit/SizedBox';

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 25px;
  height: fit-content;
  margin: 10px 0px;
  min-height: 40px;
  box-shadow: 0px 5px 26px 0px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  margin-left: 4% !important;
  width: 300px;
  min-width: 270px;
  scroll-snap-align: start;

  .header {
    background-color: ${(props) => (props.selectedId === props.crop.id ? '#747be5' : '#e3e5fa')};
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    height: fit-content;

    span {
      color: ${(props) => props.selectedId === props.crop.id && '#fff'};
    }
  }

  .body {
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    height: fit-content;

    span {
      font-size: 14px;
      margin: 4px auto;
    }
  }
`;

/**
 * CropCard
 * @param {any} props
 * @returns {JSX.Element} CropCard
 */
export function CropCard(props) {
  const { crop, onSelect, selectedId } = props;
  const {
    id, name, costPerHectare, percentageProfit, duration, season, insurance, refundPercent,
  } = crop;

  const profit = costPerHectare * (1 + percentageProfit / 100);

  return (
    <StyledCard {...props}>
      <div className="header col">
        <Text color="#333539" size={20} weight="bold">
          {name}
        </Text>
        <Text color="#333539" size={35} weight="bold">
          N
          {moneyFormat(costPerHectare)}
        </Text>
      </div>
      <div className="body col">
        <Text color="#333539">
          Estimated Profit:
          {' '}
          <Text color="accent">
            N
            {moneyFormat(profit)}
          </Text>
        </Text>
        <Text color="#333539">
          Duration:
          {' '}
          <Text color="accent">{`${duration} months`}</Text>
        </Text>
        <div className="hidden">
          <Text color="#333539">
            Season:
            {' '}
            <Text color="accent">{season}</Text>
          </Text>
          <Text color="#333539">
            Insurance:
            {' '}
            <Text color="accent">{insurance}</Text>
          </Text>
          <Text color="#333539">
            Refund Policy :
            {' '}
            <Text color="accent">{refundPercent}</Text>
          </Text>
          <Text color="accent">Money Back Guaranteed</Text>
        </div>
        <SizedBox height={10} />
        <Button type="button" color={selectedId === id ? 'primary' : 'accent'} onClick={() => onSelect(id)}>
          {selectedId === id ? 'Selected' : 'Select'}
        </Button>
      </div>
    </StyledCard>
  );
}

CropCard.propTypes = {
  crop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    costPerHectare: PropTypes.number,
    percentageProfit: PropTypes.number,
    duration: PropTypes.number,
    season: PropTypes.string,
    insurance: PropTypes.string,
    refundPercent: PropTypes.string,
  }),
  onSelect: PropTypes.func,
  selectedId: PropTypes.string,
};

CropCard.defaultProps = {
  crop: {
    name: '',
    costPerHectare: '',
    percentageProfit: '',
    duration: 6,
    season: '',
    insurance: '',
    refundPercent: '',
  },
  onSelect: () => {},
  selectedId: '',
};
