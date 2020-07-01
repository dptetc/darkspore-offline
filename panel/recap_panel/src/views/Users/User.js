import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../utils/requests'

class User extends Component {

  constructor(props) {
    super(props);

    const userMail = props.match.params.id;
    this.state = {};
    this.state.userMail = userMail;
    
    var that = this;
    Requests.dlsApiGet('api.panel.getUserInfo', {mail:userMail},function(response){
      that.setState({user: response.data.user});
    },function(error){

    });
  }

  applyChanges(valuesToMerge) {
    this.setState({user: _.merge(this.state.user, valuesToMerge)});
  }

  startTesting() {
    var parts = [];
    for (var i = 1; i <= 1573; i++) {
      parts.push({cost:1,level:5,market_status:1,rarity:1,status:1,usage:1,rigblock_asset_id:i});
    }
    for (var i = 10001; i <= 10835; i++) {
      parts.push({cost:1,level:5,market_status:1,rarity:1,status:1,usage:1,rigblock_asset_id:i});
    } 
    var creatures = [];
    var creaturesIds = [1667741389, 749013658,  3591937345, 3376462303, 576185321,
                        2128242117, 3618328019, 1237326306, 963807461,  3914325063,
                        3524487169, 2954534111, 1770764384, 3068979135, 3911756266,
                        3801146583, 1392397193, 3877795735, 1557965449, 3660811270,
                        454054015,  1986637994, 4201941707, 2530835539, 3948469269, 
                        3600769362, 4234304479, 2464059380, 820281267,  2726720353,
                        3918493889, 1475341687, 818452503,  2445894411, 3639041301,
                        1442915581, 1957997466, 647027626,  308338531,  2564618664,
                        885383220,  1194511925, 4235360698, 3764918702, 1705842957,
                        1350762291, 3384561464, 4231592197, 2828322511, 709733043,
                        185979955,  1879520589, 1647948899, 171910024,  753829266,
                        1839725446, 2230947705, 239643518,  1014804343, 1574801125,
                        43291678,   2712234379, 3863798170, 700180862,  4026895060,
                        3334429394, 1240945542, 3225553966, 725345831,  3255874076,
                        3775172336, 4157449352, 1614078369, 3108182650, 1341857832,
                        2902294899, 4216313792, 1264710567, 1943400314, 2911848321,
                        4000956288, 3904229032, 1786139715, 962104613,  4177427677,
                        713294352,  1077715391, 1663327385, 2038499613, 2691485049,
                        1850310379, 117394854,  1476711747, 3380544995, 758141691,
                        1240682488, 577654149,  3707839109, 3795238812, 507464763
                      ];
    for (var i = 0; i < creaturesIds.length; i++) {
      creatures.push({id:(i+1), gear_score:100, item_points:0, noun_id:creaturesIds[i]});
    }
    
    this.applyChanges({account:{tutorial_completed:false, chain_progression:24, creature_rewards:100, 
                                current_game_id:1, current_playgroup_id:1, default_deck_pve_id:1, 
                                default_deck_pvp_id:1, level:100, avatar_id:11, dna:10000000, 
                                new_player_inventory:1, new_player_progress:9500, cashout_bonus_time:1, 
                                star_level:10, unlock_catalysts:1, unlock_diagonal_catalysts:1, 
                                unlock_fuel_tanks:1, unlock_inventory:1, unlock_pve_decks:2, 
                                unlock_pvp_decks:1, unlock_stats:1, unlock_inventory_identify:2500, 
                                unlock_editor_flair_slots:1, upsell:1, xp:10000,
                                grant_all_access:true, grant_online_access:true},
                       creatures:creatures,
                       squads:[
                          {id:1,name:'',slot:1,locked:false,creatures:[
                            {id:1,  gear_score:100, item_points:0,  noun_id:1667741389}
                          ]},
                          {id:2,name:'',slot:1,locked:false,creatures:[
                            {id:1,  gear_score:100, item_points:0,  noun_id:1667741389}
                          ]},
                          {id:3,name:'',slot:1,locked:false,creatures:[
                            {id:1,  gear_score:100, item_points:0,  noun_id:1667741389}
                          ]}
                       ],
                       feed: {items:[]},
                       parts: parts
                      });
    this.save();
  }

  save() {
    Requests.dlsApiPost('api.panel.setUserInfo', {mail:this.state.userMail}, this.state.user,
    function(response){
      
    },function(error){

    });
  }

  render() {
    var user = this.state.user;
    return (user === undefined ? 'Loading...' :
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User mail: {user.email}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td><strong>{user.name}</strong></td>
                      </tr>
                      <tr>
                        <td><input type="checkbox" checked={user.account.tutorial_completed} 
                                   onChange={(e) => this.applyChanges({account:{tutorial_completed: e.target.checked}})}/>
                            Tutorial completed
                        </td>
                      </tr>
                      <tr>
                        <td>Level:</td>
                        <td><input type="number" value={user.account.level} 
                                   onChange={(e) => this.applyChanges({account:{level: parseInt(e.target.value)}})}/></td>
                      </tr>
                      <tr>
                        <td>XP:</td>
                        <td><input type="number" value={user.account.xp} 
                                   onChange={(e) => this.applyChanges({account:{xp: parseInt(e.target.value)}})}/></td>
                      </tr>
                      <tr>
                        <td>DNA:</td>
                        <td><input type="number" value={user.account.dna} 
                                   onChange={(e) => this.applyChanges({account:{dna: parseInt(e.target.value)}})}/></td>
                      </tr>

                      <tr>
                        <td><Button block color="primary" onClick={() => this.startTesting()}>Start testing</Button></td>
                        <td><Button block color="primary" onClick={() => this.save()}>Save</Button></td>
                      </tr>
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

export default User;
