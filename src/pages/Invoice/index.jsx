import React, {
  useEffect, useState, useRef, Fragment,
} from 'react';
import './Invoice.scss';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
// import ReactToPdf from 'react-to-pdf';
import { Text } from '../../UiKit/Text';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';
import { SizedBox } from '../../UiKit/SizedBox';

import { Sidebar } from '../../components/Sidebar';
import { useGlobalStore } from '../../store';
import { Spinner } from '../../UiKit/Spinner';
import { fetchSingleProject } from '../../store/modules/singleProject/actions';
import { PayStackButton } from '../../components/PayStackButton';
import { toKobo } from '../../helpers/toKobo';
import { startProject } from '../../store/modules/projects/actions';
import { flashToaster } from '../../store/modules/toaster/actions';
import { RightSideBar } from '../../components/RightSideBar';
import { moneyFormat } from '../../helpers/moneyFormat';
import { fetchProfile } from '../../store/modules/profile/actions';
import { Divider } from '../../UiKit/Divider';
import { generateShortId } from '../../helpers/generateShortId';
import { Scrollable } from '../../UiKit/Scrollable';

/**
 * The Dashboard
 * @returns {JSX.Element} dashboard
 */
export function Invoice() {
  const { state, dispatch } = useGlobalStore();
  const [isFetching, setIsFetching] = useState(true);

  const { projectId } = useParams();

  const { singleProject } = state;

  const invoiceRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProject({ projectId }));

      await dispatch(fetchProfile());
      setIsFetching(false);
    };

    fetchData();
  }, [dispatch, projectId]);

  const callback = (response) => {
    if (response.status === 'success') {
      dispatch(
        startProject({
          transactionRef: response.reference,
        }),
      );
      dispatch(
        flashToaster({
          message:
            'We are being notified and your project will start as soon as this payment is verified',
          type: 'lightGrey',
        }),
      );
    }
    return null;
  };


  const creationDate = new Date(singleProject.createdAt).toDateString();
  const startedDate = singleProject.startDate
    ? new Date(singleProject.startDate).toDateString()
    : 'Not yet stated';
  const completionDate = singleProject.endDate
    ? new Date(singleProject.endDate).toDateString()
    : '';

  const [canva, setcanva] = useState();

  /*
  const printDiv = (divId) => {
    const mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow.document.write('<html><head><title>hi</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(divId).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();

    return true;
  };
  */

  const downloadInvoice = async () => {
    const ref = invoiceRef.current;
    const canvas = await html2canvas(ref);
    setcanva(canva);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new JsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;

    const ratio = imageWidth / imageHeight >= pageWidth / pageHeight
      ? pageWidth / imageWidth
      : pageHeight / imageHeight;

    pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);

    pdf.save('invoice.pdf');
  };

  return (
    <main className="dashboard row">
      <Sidebar />

      {isFetching ? (
        <div className="dashboard--main">
          <Spinner center size={50} text="Gathering necessary information" />
        </div>
      ) : (
        <Fragment>
          <div className="dashboard--main">
            <SizedBox height={30} />
            <div ref={invoiceRef} id="divId">
              <Card className="row row__mainAxis--spaceBetween">
                <div className="col">
                  <Text as="h2" size={24}>
                    Invoice
                  </Text>
                  <Text>
                    Id: #
                    {generateShortId().toUpperCase()}
                  </Text>
                </div>
                <div className="col">
                  <Text as="h2" size={18}>
                    From:
                  </Text>
                  <Text size={18}>Farm4me</Text>
                  <Text size={16}>Suite 36A, Anon Plaza, Gudu, Abuja.</Text>
                  <Text size={16}>info@farm4me.com.ng</Text>
                  <Text size={16}>+2347000230230</Text>
                </div>
              </Card>
              <SizedBox height={20} />

              <div className="row row__mainAxis--spaceBetween">
                <div className="col  col-sm-6">
                  <Text as="h2" size={18}>
                    Bill To:
                  </Text>
                  <Text size={16}>{state.auth.user.firstName}</Text>
                  <Text size={16}>
                    {state.profile.address.addressLine1}
                    ,
                    {' '}
                    {state.profile.address.city}
                    ,
                    {' '}
                    {state.profile.address.state}
                  </Text>
                  <Text size={16}>{state.auth.user.phone}</Text>
                </div>
                <div className="col col-sm-6 col__crossAxis--end">
                  <Text size={16}>Date</Text>
                  <Text size={16}>{creationDate}</Text>
                </div>
              </div>
              <Divider />

              <Card className="col">
                <Scrollable className="">
                  <div className="table--item col">
                    Item Name
                    <Text size={16}>{singleProject.name}</Text>
                  </div>
                  <div className="table--item col">
                    Unit Cost/Hectare
                    <Text size={16}>
                      N
                      {moneyFormat(singleProject.costPerHectare)}
                    </Text>
                  </div>
                  <div className="table--item col">
                    Quantity
                    <Text size={16}>{singleProject.numberOfHecters}</Text>
                  </div>
                  <div className="table--item col">
                    Total Cost
                    <Text size={16}>
                      N
                      {moneyFormat(singleProject.totalCost)}
                    </Text>
                  </div>
                </Scrollable>
              </Card>

              <SizedBox height={20} />

              <div className="row">
                <div className="col col-6 col-sm-12">
                  <Text as="h2" size={26}>
                    Notes:
                  </Text>
                  <Text size={14}>
                    This invoice is for the payment of
                    {' '}
                    {singleProject.name}
                    .
                  </Text>
                  <SizedBox height={10} />
                  <Text size={14}>
                    The investment and returns attached to this invoice is only valid after
                    successful payment.
                  </Text>
                  <SizedBox height={10} />
                  <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                    <Text hexColor="#51504c" size={18}>
                      Possible Returns
                    </Text>
                    <Text size={28}>
                      N
                      {moneyFormat(singleProject.totalReturns)}
                    </Text>
                  </div>
                  <Text size={12}>
                    Returns are generally paid 48 hours after a project has completed successfully
                  </Text>
                  <SizedBox height={20} />
                </div>

                <Card className="col col-6 col-sm-12">
                  <Text size={16}>Total Amount:</Text>
                  <Text size={30}>
                    N
                    {moneyFormat(singleProject.totalCost)}
                  </Text>

                  <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                    <Text hexColor="#51504c" size={16}>
                      Payment Status
                    </Text>
                    <Text size={16}>{singleProject.isPaid ? 'Paid' : 'Pending'}</Text>
                  </div>
                  <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                    <Text hexColor="#51504c" size={16}>
                      Start Date
                    </Text>
                    <Text size={16}>{startedDate}</Text>
                  </div>
                  <div className="row row__mainAxis--spaceBetween row__crossAxis--center">
                    <Text hexColor="#51504c" size={16}>
                      Completion Date
                    </Text>
                    <Text size={16}>{completionDate}</Text>
                  </div>
                </Card>
              </div>
            </div>
            <Card className="col col-12 col__crossAxis--center">
              <Text size={16} alignment="left">
                {singleProject.isPaid
                  ? 'This Invoice has been paid'
                  : 'This Invoice has not been paid for'}
              </Text>
              <SizedBox height={10} />
              <PayStackButton
                email={state.auth.user.email}
                amount={toKobo(singleProject.totalCost)}
                reference={singleProject.reference}
                callback={callback}
                label={singleProject.isPaid ? 'Paid' : 'Pay'}
                disabled={singleProject.isPaid}
              />
              <SizedBox height={10} />
              <Button color="accent" onClick={downloadInvoice}>
                Download Invoice
              </Button>
              {/* <ReactToPdf targetRef={invoiceRef} filename="div-blue.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
              </ReactToPdf> */}
            </Card>
          </div>
        </Fragment>
      )}
      <RightSideBar />
    </main>
  );
}
