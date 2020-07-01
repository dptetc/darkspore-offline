import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../utils/requests'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.email}`

  const getBadge = (user) => {
    // return status === 'Active' ? 'success' :
    //   status === 'Inactive' ? 'secondary' :
    //     status === 'Pending' ? 'warning' :
    //       status === 'Banned' ? 'danger' :
    //         'primary'
    return user.logged ? 'success' : 'primary';
  }
  const getStatus = (user) => {
    return user.logged ? 'Logged' : '';
  }

  return (
    <tr key={user.email}>
      <th scope="row"><Link to={userLink}>{user.email}</Link></th>
      <td><Link to={userLink}><Badge color={getBadge(user)}>{getStatus(user)}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    
    var that = this;
    Requests.dlsApiGet('api.panel.listUsers',{},function(response){
      that.setState({usersList: response.data.users});
    },function(error){

    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">email</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersList === undefined ? 'Loading...' : 
                      this.state.usersList.map((user, index) =>
                        <UserRow key={index} user={user}/>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
