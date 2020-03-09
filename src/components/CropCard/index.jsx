import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from '../../UiKit/Text';
import { Button } from '../../UiKit/Button';
import { moneyFormat } from '../../helpers/moneyFormat';

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 25px;
  height: fit-content;
  margin: 10px 0px;
  min-height: 40px;
  box-shadow: 0px 10px 26px 2px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  margin-left: 20px !important;
  width: 300px;
  min-width: 270px;
  scroll-snap-align: start;

  .header {
    background-color: #e3e5fa;
    padding: 15px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    height: fit-content;
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
  const { crop, onSelect } = props;
  const {
    id, name, amount, profit, duration, season, insurance, refundPercent,
  } = crop;

  return (
    <StyledCard>
      <div className="header col">
        <Text color="#333539" size={20} weight="bold">
          {name}
        </Text>
        <Text color="#333539" size={35} weight="bold">
          N
          {moneyFormat(amount)}
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
          <Text color="accent">{duration}</Text>
        </Text>
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

        <Button color="accent" onClick={() => onSelect(id)}>
          Select
        </Button>
      </div>
    </StyledCard>
  );
}

CropCard.propTypes = {
  crop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    amount: PropTypes.number,
    profit: PropTypes.number,
    duration: PropTypes.string,
    season: PropTypes.string,
    insurance: PropTypes.string,
    refundPercent: PropTypes.string,
  }),
  onSelect: PropTypes.func,
};

CropCard.defaultProps = {
  crop: {
    name: '',
    amount: '',
    profit: '',
    duration: '',
    season: '',
    insurance: '',
    refundPercent: '',
  },
  onSelect: () => {},
};
