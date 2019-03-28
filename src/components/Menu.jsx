import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import Sidebar from 'react-sidebar';
import { GoThreeBars } from 'react-icons/go';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mql = window.matchMedia('(min-width: 800px)');

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true,
    };
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  toggle = event => {
    const id = event.target.getAttribute('id');
    this.setState(state => ({ [id]: !state[id] }));
  };

  mapper = (nodes, parentId, lvl) =>
    nodes.map((node, index) => {
      const { state, toggle, mapper } = this;
      const id = `${node.text}-${parentId || 'top'}`.replace(/[^a-zA-Z0-9-_]/g, '');
      const item = (
        <React.Fragment key={index}>
          <ListGroupItem
            className={`${parentId ? `rounded-0 ${lvl ? 'border-bottom-0' : ''}` : ''} ${
              index === 0 ? 'first' : ''
            }`}
          >
            <div className="inner-menu-item">
              {node.nodes && (
                <Button className="pl-0" color="link" id={id} onClick={toggle}>
                  {state[id] ? '-' : '+'}
                </Button>
              )}
              {node.link ? <Link to={`/${node.link}`}>{node.text}</Link> : node.text}
            </div>
          </ListGroupItem>
          {node.nodes && (
            <Collapse isOpen={state[id]}>{mapper(node.nodes, id, (lvl || 0) + 1)}</Collapse>
          )}
        </React.Fragment>
      );

      return item;
    });

  render() {
    const { menu } = this.props;
    const { data } = menu;
    if (!data.length) return 'no array';
    const children = <ListGroup>{this.mapper(data)}</ListGroup>;
    const { sidebarOpen, sidebarDocked } = this.state;
    return (
      <div className="nav-menu">
        <Sidebar
          sidebar={children}
          open={sidebarOpen}
          docked={sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName="menu-container-sidebar"
          contentClassName="menu-container-content"
        >
          {!sidebarDocked ? (
            <Button onClick={() => this.setState({ sidebarOpen: !sidebarOpen })}>
              <GoThreeBars />{' '}
            </Button>
          ) : (
            ''
          )}
        </Sidebar>
      </div>
    );
  }
}

SubMenu.propTypes = {
  menu: PropTypes.object,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return state.menu;
}

export default connect(mapStateToProps)(SubMenu);
