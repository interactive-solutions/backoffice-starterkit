import React, { Fragment } from 'react';
import moment from 'moment';
import { Segment, Divider, Header, Progress, Statistic } from 'semantic-ui-react';
import './style/dashboard.scss';


const SecondBar = ({ projectedUsage }) => (
  <div styleName='secondbar-wrapper'>
    <Progress color='green' size='big' styleName='second-bar' percent={projectedUsage} progress='percent'/>
  </div>
);

const ArrowIndicator = ({ totalPercentUsed, projectedUsage }) => {
  const totalused = totalPercentUsed < 100 ? totalPercentUsed : 100;
  const projected = projectedUsage < 100 ? projectedUsage : 100;

  return (
    <Fragment>
      <div styleName='left' style={{ width:`${totalused + 1}%` }}>
        <div styleName='right'>&#9660;</div>
      </div>
      <div styleName='left' style={{ width:`${projected}%` }}>
        <div styleName='right'>&#9660;</div>
      </div>
      <div styleName='left' style={{ width:`${101}%` }}>
        <div styleName='last'>&#9660;</div>
      </div>
    </Fragment>);
};

export const ProgressBar = (props) => {
  if (props.usersService && props.paymentPlan) {
    const { emailsSent, emailsSentResetAt, createdAt, nextInvoiceDate } = props.usersService;
    const { emails, price } = props.paymentPlan;

    const totalPercentUsed = Math.floor(((emailsSent) / emails) * 100);
    const startDateToUse = (emailsSentResetAt || createdAt);
    const startDate = moment(startDateToUse).format('MMM DD');
    const endDate = moment(nextInvoiceDate).format('MMM DD');
    const percentFilled =
    ((moment() - moment(startDateToUse)) / (moment(nextInvoiceDate) - moment(startDateToUse))) * 100;
    const roundedDate = `${Math.round((percentFilled * 100) / 100)}%`;
    const projectedUsage = Math.round(((((emails) / 100) * totalPercentUsed) / (100 - percentFilled)) * 100);
    const projectedCost = (projectedUsage / 100) * price;

    return (
      <Segment styleName='progress'>
        <Header as='h3' content='Current Usage' textAlign='left'/>
        <Divider/>
        <div styleName='progress-bar-wrapper'>
          <ArrowIndicator totalPercentUsed={totalPercentUsed} projectedUsage={projectedUsage}/>
          <Progress color='green' size='big' styleName='top-bar' percent={totalPercentUsed} progress='percent'/>
        </div>
        <SecondBar projectedUsage={projectedUsage} totalPercentUsed={totalPercentUsed}/>
        <Statistic.Group widths={3} styleName='statistics'>
          <Statistic color='green'>
            <Statistic.Label content='Billing Cycle'/>
            {`${startDate} - ${endDate}`}
            <Statistic.Value content={roundedDate}/>
            through the cycle
          </Statistic>
          <Statistic color='green'>
            <Statistic.Label content='Current Usage'/>
            current usage cost ${price}
            <Statistic.Value content={`${totalPercentUsed}%`}/>
            of included usage
          </Statistic>
          <Statistic color='green'>
            <Statistic.Label content='Projected Usage'/>
            Current projected cost ${projectedCost}
            <Statistic.Value content={`${projectedUsage}%`}/>
            of included usage
          </Statistic>
        </Statistic.Group>
      </Segment>);
  }

  return null;
};
