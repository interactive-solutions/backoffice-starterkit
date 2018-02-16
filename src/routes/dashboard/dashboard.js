// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Doughnut, Line as LineChart } from 'react-chartjs-2';
import {
  Container,
  Grid,
  Segment,
  Header,
  Divider,
  Button,
  Table
} from 'semantic-ui-react';
import moment from 'moment';
import { ProgressBar } from './progressbar';
import './style/dashboard.scss';


type Props = {};
type State = {}

export class Dashboard extends Component<Props, State> {
  customLegend(data: Object) {
    if (data && data.labels && data.labels.length > 0 && data.datasets.length > 0) {
      const legend = data.labels.map((item, index) => (
        <Table.Row >
          <Table.Cell styleName='row'>
            <div styleName='line-wrap'>
              <div styleName='box' style={{ background: data.datasets[0].backgroundColor[index] }}/>
              <div styleName='text'>{item}</div>
            </div>
          </Table.Cell>
          <Table.Cell textAlign='right' styleName='row'>{data.datasets[0].data[index]}</Table.Cell>
        </Table.Row>
      )
      );
      return (
        <Table compact singleLine styleName='table'>
          <Table.Body>
            {legend}
          </Table.Body>
        </Table>
      );
    }

    return null;
  }

  renderHeaderMenu() {
    return (
      <Fragment>
        <Button color='green' floated='right'>
          From
        </Button>
        <Button color='green' floated='right'>
          To
        </Button>
      </Fragment>
    );
  }

  renderPieChart(data: Object, header: string) {
    return (
      <Grid.Column>
        <Segment>
          <Header as='h3' content={header} textAlign='left' styleName='no-margin-top'/>
          <Divider/>
          <Doughnut
            data={data}
            options={{
              legend: { display: false }
            }}
          />
          {this.customLegend(data)}
        </Segment>
      </Grid.Column>
    );
  }

  renderLineChart(data: Object, header: string) {
    const options = {
      responsive: true,
      stacked: true,
      scales: {
        yAxes: [{
          stacked: true
        }]
      },
      elements: {
        point: {
          hitRadius: 10,
          hoverRadius: 5
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    };

    return (
      <Grid.Column>
        <Segment>
          <Header as='h3' content={header} textAlign='left'/>
          <Divider/>
          <LineChart
            data={data}
            options={options}
          />
        </Segment>
      </Grid.Column>
    );
  }

  render() {
    const pieData = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };

    const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <Container fluid textAlign='center'>
        <ProgressBar
          usersService={
            {
              emailsSent: 50,
              emailsSentResetAt: 30,
              createdAt: moment(),
              nextInvoiceDate: moment().add(15, 'days')
            }
          }
          paymentPlan={{ emails: 87, price: 99 }}
        />
        <Divider hidden/>
        <Container fluid>
          <Grid columns={3} relaxed>
            {this.renderPieChart(pieData, 'something')}
            {this.renderPieChart(pieData, 'something else')}
            {this.renderPieChart(pieData, 'the same as the other two')}
          </Grid>
        </Container>
        <Divider hidden/>
        <Container fluid>
          {this.renderLineChart(lineData, 'History')}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  usersService: state.services.usersService,
  paymentPlan: state.paymentPlan.userPaymentplan
});

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
