import React, { useState, Fragment } from 'react';
// import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import PropTypes from 'prop-types';
import { Button } from '../../UiKit/Button';
import { useWindowSize } from '../../customHooks/useWindowSize';

export const RenderPDF = (props) => {
  const [numberOfPages, setnumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { file } = props;

  const [width] = useWindowSize();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setnumberOfPages(numPages);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (numberOfPages > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getWidth = () => {
    if (width < 420) {
      return width;
    }
    return null;
  };

  return (
    <Fragment>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={currentPage} width={getWidth()} />
      </Document>
      {numberOfPages && (
      <nav className="row row__mainAxis--spaceBetween">
        <Button size="xs" onClick={goToPrevious}>Prev</Button>
        <Button size="xs" onClick={goToNext}>Next</Button>
      </nav>
      )}
    </Fragment>
  );
};

RenderPDF.propTypes = {
  file: PropTypes.string.isRequired,
};
